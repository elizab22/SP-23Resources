from flask import Flask, request, jsonify
from plant_recommend import get_scores, init, df


app = Flask(__name__)

global dict_list_per_region
global df_list_per_region

@app.route("/search", methods=["POST"])
def search():
    params = request.json
    region = params.get("region")
    score = get_scores([params.get("sun_expo"), params.get("color"), params.get("season"), params.get("fruit"), params.get("type"), params.get("size") ], df_list_per_region[int(region)], dict_list_per_region[int(region)])
    score.sort_values('Score', inplace = True, ascending = False)
    print(score.head(10).to_dict())
    results = []
    head = score.head(10)
    for i in range(0, 9):
        results.append(head.iloc[i].to_dict())

    return jsonify({"results": results})
    # return score.head(10).to_dict()


@app.route("/get-plant")
def get_plant():
    plant_id = request.args.get("id")
    region = request.args.get("region")
    return (df_list_per_region[int(region)]).iloc[int(plant_id)].to_dict()

@app.route("/init")
def init_df():
    global dict_list_per_region, df_list_per_region
    dict_list_per_region, df_list_per_region = init()
    return "done"

if __name__ == "__main__":
    app.run(port=5001)



