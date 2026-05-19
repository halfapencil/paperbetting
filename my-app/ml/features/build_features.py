import pandas as pd

"""
Parameters:
df : dataframe 
n : int, last N games/rows
col : str, column to calculate
"""


# Rolling average
def add_rolling_avg(df, n, col):

    df[f"{col}_last_{n}"] = df.groupby("player_id")[col].transform(
        lambda x: x.shift(1).rolling(window=n).mean()
    )

    return df


# Rolling zscore
def rolling_zscore(df, n, col):
    df = df.sort_values(["player_id,date_played"])
    grouped = df.groupby("player_id")[col]

    rolling_mean = grouped.transform(lambda x: x.shift(1).rolling(n).mean())

    rolling_std = grouped.transform(lambda x: x.shift(1).rolling(n).std())

    df[f"{col}_zscore_n"] = ((df[col]) - rolling_mean) / rolling_std
    return df
