import { nbaPlayerStatRow } from "@/types/nbaPlayerStats";

export const NBA_STAT_COLUMNS: {
    key: keyof nbaPlayerStatRow;
    label: string;
}[] = [
    { key: "playerName", label: "Player Name" },
    { key: "minutes", label: "Minutes" },
    { key: "fg", label: "FG" },
    { key: "fga", label: "FGA" },
    { key: "fgPct", label: "FG%" },
    { key: "threePt", label: "3PT" },
    { key: "threePa", label: "3PA" },
    { key: "threePtPct", label: "3P%" },
    { key: "ft", label: "FT" },
    { key: "fta", label: "FTA" },
    { key: "ftPct", label: "FT%" },
    { key: "oreb", label: "OREB" },
    { key: "dreb", label: "DREB" },
    { key: "trb", label: "TRB" },
    { key: "ast", label: "AST" },
    { key: "stl", label: "STL" },
    { key: "blk", label: "BLK" },
    { key: "tov", label: "TOV" },
    { key: "pf", label: "PF" },
    { key: "pts", label: "PTS" },
    { key: "plusMinus", label: "+/-" },
];