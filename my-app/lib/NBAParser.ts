import { nbaPlayerStatRow } from "@/types/nbaPlayerStats";
// Parse clipboard for nba box scores
export function NBAParser(text: string): nbaPlayerStatRow[] {
    const lines = text.trim().split("\n");

    return (lines.map((line, index) => {
        const [
            playerName,
            minutes,
            fg,
            fga,
            fgPct,
            threePt,
            threePa,
            threePtPct,
            ft,
            fta,
            ftPct,
            oreb,
            dreb,
            trb,
            ast,
            stl,
            blk,
            tov,
            pf,
            pts,
            plusMinus
        ] = line.split("\t");
        return {
            playerName: playerName?.trim() || "",
            minutes: Number(minutes?.split(":")[0]) || 0,

            fg: Number(fg) || 0,
            fga: Number(fga) || 0,
            fgPct: Number(fgPct) || 0,

            threePt: Number(threePt) || 0,
            threePa: Number(threePa) || 0,
            threePtPct: Number(threePtPct) || 0,

            ft: Number(ft) || 0,
            fta: Number(fta) || 0,
            ftPct: Number(ftPct) || 0,

            oreb: Number(oreb) || 0,
            dreb: Number(dreb) || 0,
            trb: Number(trb) || 0,

            ast: Number(ast) || 0,
            stl: Number(stl) || 0,
            blk: Number(blk) || 0,
            tov: Number(tov) || 0,
            pf: Number(pf) || 0,

            pts: Number(pts) || 0,
            plusMinus: Number(plusMinus) || 0
        };
    }))
}