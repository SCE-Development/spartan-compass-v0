from scrapers import rmp

def main():
    rmp_professors = rmp.get_professors()  # Assuming rmp.get_professors() retrieves data
    #print(rmp_professors)
    if rmp_professors:
        print("RMP Professors:")
        for professor in rmp_professors:
            print(professor)
    else:
        print("No professor data found in the response.")
main()