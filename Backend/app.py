from flask import Flask, request, jsonify
from plant_recommend import get_scores, init, df
import math

app = Flask(__name__)

global dict_list_per_region
global df_list_per_region

# Process data to remove NaNs
def cleanData(data):
    if not isinstance(data["Image"], str) and math.isnan(data["Image"]):
            data["Image"] = "https://www.onlygfx.com/wp-content/uploads/2020/09/pot-plant-silhouette-2.png"   
    if not isinstance(data["Additional Comments"], str) and math.isnan(data["Additional Comments"]):
            data["Additional Comments"] = ""  
    return data  

# Search route, takes in search parameters through JSON and returns items that match the best.
# Allows for either only text based search or also with filters, or both
@app.route("/search", methods=["POST"])
def search():

    # extract params from request and get search results
    params = request.json
    region = params.get("region")
    score = get_scores([params.get("sun_expo"), params.get("color"), params.get("season"), params.get("fruit"), params.get("type"), params.get("size") ], df_list_per_region[int(region)], dict_list_per_region[int(region)])
    score.sort_values('Score', inplace = True, ascending = False)
    results = []

    # if user is only searching by text, allow them to search entire database
    if (params.get("isOnlyText")):
        used = []

        # find plants where either the name or description matches the query
        for i in range(0, 100):
            data = score.iloc[i].to_dict()     
            data = cleanData(data)
            if params.get("query") and params.get("query") != "": 
                if params.get("query").lower() in data["Name"].lower() or params.get("query").lower() in data["Description"].lower() and data["Name"] not in used:
                    results.append(data)
                    used.append(data["Name"])
            else:
                results.append(data)
                used.append(data["Name"])

    # if user is searching by filters and/or text, then first get top 50 search results and filter
    # through that
    else:
        head = score.head(50)
        used = []

        # if user didn't enter any text into search
        if (params.get("query") and params.get("query") != ""):
            for i in range(0, 10):
                data = head.iloc[i].to_dict()
                data = cleanData(data) 
                if (data["Name"] not in used and params.get("query").lower() in data["Name"].lower() or params.get("query").lower() in data["Description"].lower()):
                    results.append(data) 
                    used.append(data["Name"]) 

        # otherwise, filter by search query as well   
        else:
            for i in range(0, 10):
                data = head.iloc[i].to_dict()
                if (head.iloc[i].to_dict()["Name"] not in used):
                    results.append(data) 
                    used.append(data["Name"]) 
    return jsonify({"results": results})


# route to get plant by id
@app.route("/get-plant")
def get_plant():
    # extract id and region parameters from url and return plant data
    plant_id = request.args.get("id")
    region = request.args.get("region")
    return (df_list_per_region[int(region)]).iloc[int(plant_id)].to_dict()

# route to initialize global variables needed to easily get plants in each region
# since there's lots of data, this is done only once instead of each time someone searches to
# make it quick and efficient when searching
@app.route("/init")
def init_df():
    global dict_list_per_region, df_list_per_region
    dict_list_per_region, df_list_per_region = init()
    return "done"

# run the app locally on port 5001 (when running on an actual server this would change)
if __name__ == "__main__":
    app.run(port=5001)



