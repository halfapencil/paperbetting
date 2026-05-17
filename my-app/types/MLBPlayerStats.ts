export type mlbPitcherStatRow = {
    playerName: string;
    ip: number;         // innings pitched
    h: number;          // hits
    r: number;          // runs
    er: number;          // Earned runs
    bb: number;          // walks
    hr: number          // Home run
}

export type mlbHitterStatRow = {
    playerName: string;
    ab: number;          // At bats
    hr: number;
    runs: number;
    hits: number;
    rbi: number;         // Runs batted in
    bb: number;          // Walks
    k: number            // Strikeouts
}
//Derived hitter stats
//AVG : hits.ab
