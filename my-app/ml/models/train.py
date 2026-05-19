from ml.features.build_features import add_rolling_avg, rolling_zscore
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import RandomForestRegressor

# game_rows_df = pd.read_csv("my-app\ml\data\games_rows.csv")
player_stat_df = pd.read_csv("ml\\data\\player_game_stats_nba_rows.csv")
# players_df = pd.read_csv("my-app\ml\data\players_rows.csv")
# team_stats_df = pd.read_csv("my-app\ml\data\players_rows.csv")
# teams_df = pd.read_csv("my-app\ml\data\\teams_rows.csv")
feature_cols = [
    "points_last_3",
    "points_last_5",
    "points_last_7",
]
df = player_stat_df.copy()
stat = "points"
df = df.sort_values(["player_id", "games_id"])

# id :228

df = add_rolling_avg(df, 3, stat)
df = add_rolling_avg(df, 5, stat)
df = add_rolling_avg(df, 7, stat)

row = df[df["player_id"] == 306].tail(1)

x = df[feature_cols]
y = df["points"]
model = RandomForestRegressor()
model.fit(x, y)

X_test = row[feature_cols]
pred = model.predict(X_test)
print(pred)
