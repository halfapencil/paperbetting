"use client";

import styles from "../../styles/adminNBAGames.module.css";
import { NBAParser } from "@/lib/NBAParser";
import { useState, useEffect } from "react";
import NBAStatTable from "./NBAStatTable";
import { nbaPlayerStatRow } from "@/types/nbaPlayerStats";
import { EMPTY_NBA_STAT_ROW } from "@/lib/nba/emptyNBAStatRow";
import dynamic from "next/dynamic";

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

    const [home, setHome] = useState<number | null>(null);
    const [away, setAway] = useState<number | null>(null);

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

    const darkSelectStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: "#111827",
            borderColor: state.isFocused ? "#3b82f6" : "#374151",
            boxShadow: "none",
            minHeight: "42px",
            color: "white",
        }),

        menu: (provided: any) => ({
            ...provided,
            backgroundColor: "#111827",
            border: "1px solid #374151",
        }),

        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#1e293b" : "#111827",
            color: "white",
            cursor: "pointer",
        }),

        singleValue: (provided: any) => ({
            ...provided,
            color: "white",
        }),

        input: (provided: any) => ({
            ...provided,
            color: "white",
        }),

        placeholder: (provided: any) => ({
            ...provided,
            color: "#9ca3af",
        }),

        dropdownIndicator: (provided: any) => ({
            ...provided,
            color: "#9ca3af",
        }),

        indicatorSeparator: () => ({
            display: "none",
        }),
    };

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
            body: JSON.stringify({ date: date, homeScores: filteredHomeRows, awayScores: filteredAwayRows, homeTeam: home, awayTeam: away })
        })
        // 500 is error
        if (res.status == 500) {
            setInsertError(true);
        } else if (res.status == 200) {
            setInserted(true)
        }
    }
    return (
        <div>
            <div className={styles.selectWrapper}>
                <input type='date' value={date} onChange={(e) => setDate(e.target.value)}></input>

                <Select options={selectOptions} placeholder="home" styles={darkSelectStyles} onChange={(e) => setHome(e?.value ?? null)}></Select>
                <Select options={selectOptions} placeholder="away" styles={darkSelectStyles} onChange={(e) => setAway(e?.value ?? null)}></Select>
            </div>
            <button onClick={clearTable}> Clear Table</button> <br></br>
            <button onClick={insertScores}> Insert Scores</button>
            {insertError && <h1>Insert Error</h1>}
            <br></br>
            {inserted && <h1>{home} vs {away}</h1>}
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