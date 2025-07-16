import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from flask import Flask, render_template, request
import joblib
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_DIR = os.path.join(BASE_DIR, "../Front-end/templates")
STATIC_PATH = os.path.join(BASE_DIR, "../Front-end/static")


app = Flask(__name__, template_folder=TEMPLATE_DIR, static_folder=STATIC_PATH)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/profile")
def profile():
    return render_template("profile.html")


@app.route("/card", methods=["POST"])
def card():
    soccer_model = joblib.load("soccer_model.pkl")

    first_name = request.form["First_Name"]
    last_name = request.form["Last_Name"]


    picture = request.files["Picture"]
    if picture and picture.filename:
        picture_path = os.path.join(STATIC_PATH,"uploads", picture.filename)
        picture.save(picture_path)
        picture_url = f"/static/uploads/{picture.filename}"
    else:
        picture_url = "/static/uploads/no-picture-available-icon-20.jpg"


    position = request.form["Position"]
    age = request.form["age"]
    country_from = request.form["Country-from"]
    league_from = request.form["league-from"]
    club_from = request.form["Club-from"]
    country_to = request.form["Country-to"]
    league_to = request.form["league-to"]
    club_to = request.form["Club-to"]

    data_frame = pd.DataFrame({
        "position": [position],
        "age": [age],
        "country_from": [country_from],
        "league_from": [league_from],
        "club_from": [club_from],
        "country_to": [country_to],
        "league_to": [league_to],
        "club_to": [club_to]
    })

    OH_encoder = joblib.load("one_hot_encoder.pkl")
    OH_data_frame = pd.DataFrame(OH_encoder.transform(data_frame))

    OH_data_frame.index = data_frame.index
    OH_data_frame.columns = OH_data_frame.columns.astype(str)

    prediction = soccer_model.predict(OH_data_frame)


    return render_template("card.html", first_name=first_name, last_name=last_name, picture_url=picture_url, prediction=prediction)