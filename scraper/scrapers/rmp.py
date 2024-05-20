import requests

RMP_URL = "https://www.ratemyprofessors.com/graphql"
AUTH_USERNAME = "test"
AUTH_PASSWORD = "test"

def get_professors():
  query = """
    query TeacherSearchResultsPageQuery($query: TeacherSearchQuery!) {
      search: newSearch {
        teachers(query: $query, first: 10000, after: "") {
          edges {
            node {
              id
              avgRating
              numRatings
              firstName
              lastName
              department
              wouldTakeAgainPercent
              avgDifficulty
            }
          }
        }
      }
    }
  """

  variables = {
    "query": {
        "text": "",
        "schoolID": "U2Nob29sLTg4MQ==",
        "fallback": True,
        "departmentID": None
    },
    "first": 10,
    "after": ""
  }

  response = requests.post(
    RMP_URL,
    json={"query": query, "variables": variables},
    auth=(AUTH_USERNAME, AUTH_PASSWORD)
  )
  
  if response.status_code == 200:
    data = response.json()
    professors = data['data']['search']['teachers']['edges']
    return professors
  else:
    return f"Error: Unable to fetch data. Status code: {response.status_code}"

