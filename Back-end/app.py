import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from flask import request
from flask import Flask
import joblib


app = Flask(__name__)



@app.route("/predict", methods=["POST"])
def predict():
    soccer_model = joblib.load("soccer_model.pkl")

    data = request.get_json()
    data_frame = pd.DataFrame([data])

    OH_encoder = joblib.load("one_hot_encoder.pkl")
    OH_data_frame = pd.DataFrame(OH_encoder.transform(data_frame))

    OH_data_frame.index = data_frame.index
    OH_data_frame.columns = OH_data_frame.columns.astype(str)


    print(f"Predicted player's market value: €{soccer_model.predict(OH_data_frame)}M\n")