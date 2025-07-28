import pandas as pd
from flask import Flask, render_template, request
import sqlite3
import joblib
import os


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_DIR = os.path.join(BASE_DIR, "../Front-end/templates")
STATIC_PATH = os.path.join(BASE_DIR, "../Front-end/static")
DB_PATH = os.path.join(BASE_DIR, "playerdb.sqlite")
MODEL_PATH = os.path.join(BASE_DIR, "soccer_model.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "one_hot_encoder.pkl")

app = Flask(__name__, template_folder=TEMPLATE_DIR, static_folder=STATIC_PATH)

db = sqlite3.connect(DB_PATH)
cursor = db.cursor()

cursor.execute("""
            CREATE TABLE IF NOT EXISTS players (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                position TEXT,
                age INTEGER,
                country_from TEXT,
                league_from TEXT,
                club_from TEXT,
                country_to TEXT,
                league_to TEXT,
                club_to TEXT,
                photo_url TEXT,
                market_value REAL
            );
            """)
db.commit()
cursor.close()
db.close()


@app.route("/")
def index():
 
    return render_template("index.html")

@app.route("/profile")
def profile():
    return render_template("profile.html")

@app.route("/display", methods=["GET"])
def display():
    db = sqlite3.connect(DB_PATH)
    cursor = db.cursor()
    
    cursor.execute("SELECT * FROM players")
    
    players = cursor.fetchall()
    
    cursor.close()
    db.close()
    
    return render_template("display.html", players=players)

@app.route("/delete/<int:player_id>")
def delete(player_id):
    db = sqlite3.connect(DB_PATH)
    cursor = db.cursor()
    
    
    cursor.execute("SELECT * FROM players WHERE id=?", (player_id, ))
    player = cursor.fetchone()
    cursor.execute("DELETE FROM players WHERE id=?", (player_id, ))
    db.commit()
    
    cursor.close()
    db.close()
    
    return render_template("delete.html", player=player)

@app.route("/update/<int:player_id>", methods=["GET", "POST"])
def update(player_id):
    soccer_model = joblib.load(MODEL_PATH)
    db = sqlite3.connect(DB_PATH)
    cursor = db.cursor()
    
    cursor.execute("SELECT * FROM players WHERE id=?", (player_id, ))
    player = cursor.fetchone()
    
    if(request.method == "POST"):
        name = request.form["Name"]
        position = request.form["Position"]
        age = request.form["age"]
        country_from = request.form["Country-from"]
        league_from = request.form["league-from"]
        club_from = request.form["Club-from"]
        country_to = request.form["Country-to"]
        league_to = request.form["league-to"]
        club_to = request.form["Club-to"]
        picture = request.files["Picture"]
        
        if not (name and position and age and country_from and league_from and club_from and country_to and league_to and club_to):
            return render_template("exception.html")
        if (club_from == club_to):
            return render_template("exception.html")
        
        if picture and picture.filename:
            picture_path = os.path.join(STATIC_PATH,"uploads", picture.filename)
            picture.save(picture_path)
            picture_url = f"/static/uploads/{picture.filename}"
        else:
            picture_url = player[10]
            
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

        OH_encoder = joblib.load(ENCODER_PATH)
        OH_data_frame = pd.DataFrame(OH_encoder.transform(data_frame))

        OH_data_frame.index = data_frame.index
        OH_data_frame.columns = OH_data_frame.columns.astype(str)

        prediction = soccer_model.predict(OH_data_frame)[0]

        
        cursor.execute("UPDATE players SET name=?, position=?, age=?, country_from=?, league_from=?, club_from=?, country_to=?, league_to=?, club_to=?, photo_url=?, market_value=? WHERE id=?", (name, position, age, country_from, league_from, club_from, country_to, league_to, club_to, picture_url, prediction, player_id ))
        cursor.execute("SELECT * FROM players")
    
        players = cursor.fetchall()
        
        db.commit()
        cursor.close()
        db.close()
        return render_template("display.html", players=players)
    else:
        cursor.execute("SELECT * FROM players WHERE id=?", (player_id, ))
        player = cursor.fetchone()
        cursor.close()
        db.close()
        return render_template('update.html', player=player)
    
@app.route("/player/<int:player_id>", methods=["GET"])
def player(player_id):
    db = sqlite3.connect(DB_PATH)
    cursor = db.cursor()
    
    cursor.execute("SELECT * FROM players WHERE id=?", (player_id, ))
    player = cursor.fetchone()
    
    cursor.close()
    db.close()
    
    return render_template("player.html", player=player)
    
    
    


@app.route("/card", methods=["POST"])
def card():
    soccer_model = joblib.load(MODEL_PATH)
    db = sqlite3.connect(DB_PATH)
    cursor = db.cursor()

    first_name = request.form["First_Name"]
    last_name = request.form["Last_Name"]
    name = first_name + " " + last_name


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
    
    if not (first_name and last_name and position and age and country_from and league_from and club_from and country_to and league_to and club_to):
        return render_template("exception.html")
    if (club_from == club_to):
        return render_template("exception.html")
    
        
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

    OH_encoder = joblib.load(ENCODER_PATH)
    OH_data_frame = pd.DataFrame(OH_encoder.transform(data_frame))

    OH_data_frame.index = data_frame.index
    OH_data_frame.columns = OH_data_frame.columns.astype(str)

    prediction = soccer_model.predict(OH_data_frame)[0]

    
    cursor.execute("INSERT INTO players (name, position, age, country_from, league_from,club_from, country_to, league_to, club_to, photo_url, market_value)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (name, position, age, country_from, league_from, club_from,  country_to, league_to, club_to, picture_url, prediction)
    )
    
    db.commit()
    
    
    cursor.close()
    db.close()
    


    return render_template("card.html", first_name=first_name, last_name=last_name, picture_url=picture_url, prediction=prediction)

if __name__=="__main__":
    app.run()