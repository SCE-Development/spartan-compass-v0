import { redirect } from "@sveltejs/kit";
import { generateState, generateCodeVerifier } from 'arctic';
import { googleAuth } from '$lib/server/auth';

const { DEV } = process.env;


import type { RequestEvent } from "@sveltejs/kit"; 

export async function GET(event: RequestEvent): Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await googleAuth.createAuthorizationURL(state, codeVerifier, { 
    scopes: ["profile", "email"] 
  });
  
  event.cookies.set('google_state', state, {
    path: "/",
    secure: !DEV,
    httpOnly: true,
    maxAge: 60 * 10
  });

  event.cookies.set('code_verifier', codeVerifier, {
    path: "/",
    secure: !DEV,
    httpOnly: true,
    maxAge: 60 * 10
  });
  
  return redirect(302, url.toString());

}