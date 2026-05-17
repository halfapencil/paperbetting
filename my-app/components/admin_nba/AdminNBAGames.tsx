"use client";

import styles from "../../styles/adminNBAGames.module.css";
import { NBAParser } from "@/lib/services/NBAParser";
import { useState, useEffect } from "react";
import NBAStatTable from "./NBAStatTable";
import { nbaPlayerStatRow } from "@/types/nbaPlayerStats";
import { EMPTY_NBA_STAT_ROW } from "@/lib/nba/emptyNBAStatRow";
import dynamic from "next/dynamic";
import { SingleValue } from "react-select";
import { darkSelectStyles } from "@/styles/darkSelectStyle";
const Select = dynamic(
    () => import("react-select"),
    { ssr: false }
) as typeof import("react-select").default;
// Component page for adding nba box scores
export default function AdminNBAGames() {
    type TeamOptions = {
        value: number;
        label: string;
    };

    const [selectOptions, setSelectOptions] = useState<TeamOptions[]>([]);
    const [date, setDate] = useState("");

    const [home, setHome] = useState<SingleValue<TeamOptions> | null>(null);
    const [away, setAway] = useState<SingleValue<TeamOptions> | null>(null);

    const [homeName, setHomeName] = useState<string | null>(null);
    const [awayName, setAwayName] = useState<string | null>(null);
    const [insertError, setInsertError] = useState(false);
    const [inserted, setInserted] = useState(false);

    const NUM_ROWS = 20;
    const INITIAL_ROWS = Array.from({ length: NUM_ROWS }, () => ({ ...EMPTY_NBA_STAT_ROW }));


    const [homeRows, setHomeRows] =
        useState<nbaPlayerStatRow[]>(
            INITIAL_ROWS.map(row => ({ ...row }))
        );

    const [awayRows, setAwayRows] =
        useState<nbaPlayerStatRow[]>(
            INITIAL_ROWS.map(row => ({ ...row }))
        );

    async function getTeams() {
        const res = await fetch("http://localhost:3000/api/admin/nba_teams");
        const data = await res.json();

        const options = data.map((team: any) => ({
            value: team.teams_id,
            label: team.teams_abrev
        }));

        setSelectOptions(options);
    }
    useEffect(() => { getTeams(); }, []);

    function clearTable() {
        setHomeRows(
            INITIAL_ROWS.map(row => ({ ...row }))
        )
        setAwayRows(
            INITIAL_ROWS.map(row => ({ ...row }))
        )
    }
    async function insertScores() {
        setInsertError(false);
        setInserted(false);


        const filteredHomeRows = homeRows.filter((row) => row.playerName.trimEnd() !== "");
        const filteredAwayRows = awayRows.filter((row) => row.playerName.trimEnd() !== "");
        const res = await fetch("http://localhost:3000/api/admin/nba_box_score", {
            method: 'POST',
            body: JSON.stringify({ date: date, homeScores: filteredHomeRows, awayScores: filteredAwayRows, homeTeam: home?.value, awayTeam: away?.value })
        })
        // 500 is error
        if (res.status == 500) {
            setInsertError(true);
        } else if (res.status == 200) {
            setInserted(true)
            setHomeName(home?.label ?? null);
            setAwayName(away?.label ?? null);
        }
    }
    return (
        <div>
            <div className={styles.selectWrapper}>
                <input className={styles.dateInput}
                    type='date' value={date} onChange={(e) => setDate(e.target.value)}></input>
                <h1>Home</h1>
                <Select options={selectOptions} placeholder="home" styles={darkSelectStyles} onChange={(e) => { setHome(e) }}></Select>
                <h1>Away</h1>
                <Select options={selectOptions} placeholder="away" styles={darkSelectStyles} onChange={(e) => { setAway(e) }}></Select>
            </div>
            <div className="flex gap-3 mt-4">

                <button
                    onClick={clearTable}
                    className="px-4 py-2 rounded-xl border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition"
                >
                    Clear Table
                </button>

                <button
                    onClick={insertScores}
                    className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
                >
                    Insert Scores
                </button>

            </div>
            {insertError && <h1>Insert Error</h1>}
            <br></br>
            {inserted && <h1>Most Recently inserted: {homeName} vs {awayName}</h1>}
            <div>
                <NBAStatTable
                    title="home"
                    rows={homeRows}
                    setRows={setHomeRows} />
                <NBAStatTable
                    title="away"
                    rows={awayRows}
                    setRows={setAwayRows} />
            </div>
        </div>
    )
}