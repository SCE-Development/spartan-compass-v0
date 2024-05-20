import requests

RMP_URL = "https://www.ratemyprofessors.com/graphql"
AUTH_USERNAME = "test"
AUTH_PASSWORD = "test"

def get_professors():
  query = "teachers(query: $query, first: 10000, after: "") { query SchoolRatingsListQuery(\n  $count: Int!\n  $id: ID!\n  $cursor: String\n) {\n  node(id: $id) {\n    __typename\n    ... on School {\n      ...SchoolRatingsList_school_1G22uz\n    }\n    id\n  }\n}\n\nfragment SchoolRatingsList_school_1G22uz on School {\n  id\n  name\n  city\n  state\n  country\n  legacyId\n  ratings(first: $count, after: $cursor) {\n    edges {\n      cursor\n      node {\n        ...SchoolRating_rating\n        id\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n  ...SchoolRating_school\n}\n\nfragment SchoolRating_rating on SchoolRating {\n  clubsRating\n  comment\n  date\n  facilitiesRating\n  foodRating\n  happinessRating\n  internetRating\n  locationRating\n  opportunitiesRating\n  reputationRating\n  safetyRating\n  socialRating\n  legacyId\n  flagStatus\n  createdByUser\n  ...SchoolRatingFooter_rating\n}\n\nfragment SchoolRating_school on School {\n  ...SchoolRatingSuperHeader_school\n  ...SchoolRatingFooter_school\n}\n\nfragment SchoolRatingSuperHeader_school on School {\n  name\n  legacyId\n}\n\nfragment SchoolRatingFooter_school on School {\n  id\n  legacyId\n  ...Thumbs_school\n}\n\nfragment Thumbs_school on School {\n  id\n  legacyId\n}\n\nfragment SchoolRatingFooter_rating on SchoolRating {\n  id\n  comment\n  flagStatus\n  legacyId\n  ...Thumbs_schoolRating\n}\n\nfragment Thumbs_schoolRating on SchoolRating {\n  id\n  legacyId\n  thumbsDownTotal\n  thumbsUpTotal\n  userThumbs {\n    computerId\n    thumbsUp\n    thumbsDown\n    id\n  }\n}\n}"
  variables = {"count": 10, "id": "U2Nob29sLTg4MQ==", "cursor": "YXJyYXljb25uZWN0aW9uOjE5"}

  response = requests.post(
    RMP_URL,
    json={"query": query, "variables": variables},
    auth=(AUTH_USERNAME, AUTH_PASSWORD)
  )
  
  if response.status_code == 200:
    data = response.json()
    professors = data
    return professors
  else:
    return f"Error: Unable to fetch data. Status code: {response.status_code}"

if __name__ == "__main__":
  professors = get_professors()
  print(professors)
