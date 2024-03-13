import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { eq } from "drizzle-orm";

import { lucia, googleAuth } from "$lib/server/auth";
import { db } from "$lib/db/db.server";
import { userTable } from "$lib/db/schema";

import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
  const code = event.url.searchParams.get("code");
  const state = event.url.searchParams.get("state");
  const storedState = event.cookies.get("google_state");
  const storedCodeVerifier = event.cookies.get("code_verifier");

  if (!code || !state || !storedState || state !== storedState || !storedCodeVerifier) {
    return new Response("User Cancelled", {
      status: 302,
      headers: {
        location: "/"
      }
    });
  }

  try {
    const tokens = await googleAuth.validateAuthorizationCode(code, storedCodeVerifier);
    const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });
    const googleUser = await response.json();
    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.googleId, googleUser.sub));
    if (existingUser[0]) {
      const session = await lucia.createSession(existingUser[0].id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
      });
    } else {
      const userId = generateId(15);
      await db
        .insert(userTable)
        .values({
          id: userId,
          username: googleUser.name,
          email: googleUser.email,
          googleId: googleUser.sub,
          createdAt: new Date()
        });
      
        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
          path: ".",
          ...sessionCookie.attributes
        });
    }
    console.log("User logged in as " + googleUser.name + " (" + googleUser.email + ")");
    return new Response("Authenticated", { 
      status: 302,
      headers: {
        location: "/"
      }
    });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response("Invalid request", { 
        status: 400 
      });
    }
    console.error(e);
    return new Response("Internal server error", { 
      status: 500 
    });
  }
}