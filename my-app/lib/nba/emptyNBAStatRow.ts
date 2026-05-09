import { nbaPlayerStatRow } from "@/types/nbaPlayerStats";

export const EMPTY_NBA_STAT_ROW: nbaPlayerStatRow = {
    playerName: "",
    minutes: 0,

    fg: 0,
    fga: 0,
    fgPct: 0,

    threePt: 0,
    threePa: 0,
    threePtPct: 0,

    ft: 0,
    fta: 0,
    ftPct: 0,

    oreb: 0,
    dreb: 0,
    trb: 0,

    ast: 0,
    stl: 0,
    blk: 0,
    tov: 0,
    pf: 0,

    pts: 0,
    plusMinus: 0,
};