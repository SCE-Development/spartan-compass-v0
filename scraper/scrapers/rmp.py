import requests

RMP_URL = "https://www.ratemyprofessors.com/graphql"
AUTH_USERNAME = "test"
AUTH_PASSWORD = "test"

query = """
    
query TeacherSearchPaginationQuery(
  $query: TeacherSearchQuery!
) {
  search: newSearch {
    ...TeacherSearchPagination_search_1jWD3d
  }
}

fragment TeacherSearchPagination_search_1jWD3d on newSearch {
  teachers(query: $query, first: 2, after: "") {
    edges {
      node {
        ...TeacherCard_teacher
        #id <- school id
      }
    }
    resultCount
  }
}

fragment TeacherCard_teacher on Teacher {
  id
#   legacyId
  avgRating
  numRatings
  ...CardFeedback_teacher
  ...CardSchool_teacher
  ...CardName_teacher
}

fragment CardFeedback_teacher on Teacher {
  wouldTakeAgainPercent
  avgDifficulty
}

fragment CardSchool_teacher on Teacher {
  department
}

fragment CardName_teacher on Teacher {
  firstName
  lastName
}



"""
variables = {
    "query": {
        "text": "",
        "schoolID": "U2Nob29sLTg4MQ==",
        "fallback": True,
        "departmentID": None
    },
    "count": 1,
    "cursor": "YXJyYXljb25uZWN0aW9uOjIz"
}
def get_professors():
    response = requests.post(RMP_URL, json={"query": query, "variables": variables}, auth=(AUTH_USERNAME, AUTH_PASSWORD))
    teachers = response.json()['data']['search']['teachers']['edges']
    # print(teachers)
    # print(response.json())
    # teachers = response['data']['search']['teachers']['edges']
    return teachers
#

