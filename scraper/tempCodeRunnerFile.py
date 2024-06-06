if rmp_professors:
        print("RMP Professors:")
        for professor in rmp_professors['data']['search']['teachers']['edges']:
            professor_data = professor['node']
            print(professor_data)
    else:
        print("No professor data found in the response.")