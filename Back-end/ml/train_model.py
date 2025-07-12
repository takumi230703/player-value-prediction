import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeRegressor
from sklearn.preprocessing import OneHotEncoder
import joblib


soccer_player_path = "/Users/user/player-value-prediction/Back-end/ml/data/2022_2023_football_summer_transfers.csv"

def train_model():
    soccer_player_data = pd.read_csv(soccer_player_path)

    y = soccer_player_data.market_value
    bad_index = y[y == '-'].index
    y_cleaned = y.drop(bad_index)

    features = ["position", "age", "country_from", "league_from", "club_from", "country_to", "league_to", "club_to"]

    X = soccer_player_data[features]
    X_cleaned = X.drop(bad_index)

    train_X, val_X, train_y, val_y = train_test_split(X_cleaned, y_cleaned, random_state=0) 

    OH_encoder = OneHotEncoder(handle_unknown="ignore", sparse_output=False)
    OH_X_train = pd.DataFrame(OH_encoder.fit_transform(train_X[features]))
    OH_X_valid  = pd.DataFrame(OH_encoder.transform(val_X[features]))
    joblib.dump(OH_encoder, "one_hot_encoder.pkl")



    OH_X_train.index = train_X.index
    OH_X_valid .index = val_X.index

    OH_X_train.columns = OH_X_train.columns.astype(str)
    OH_X_valid.columns = OH_X_valid.columns.astype(str)

    soccer_model = DecisionTreeRegressor(max_leaf_nodes=500, random_state=1)

    soccer_model.fit(OH_X_train, train_y)

    joblib.dump(soccer_model, "soccer_model.pkl")




if __name__ == "__main__":
    train_model()







