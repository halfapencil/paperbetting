"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import styles from "../../styles/adminNBAGames.module.css";

const Select = dynamic(
    () => import("react-select"),
    { ssr: false }
) as typeof import("react-select").default;
export default function ScheduleGameNBA() {
    type TeamOptions = {
        value: number;
        label: string;
    }

    const [selectOptions, setSelectOptions] = useState<TeamOptions[]>([]);
    const [date, setDate] = useState("");

    const [home, setHome] = useState<number | null>(null);
    const [away, setAway] = useState<number | null>(null);
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
    async function getTeams() {
        const res = await fetch("http://localhost:3000/api/admin/nba_teams");
        const data = await res.json();

        const options = data.map((team: any) => ({
            value: team.teams_id,
            label: team.teams_abrev
        }));

        setSelectOptions(options);
    }

    async function insertGame() {
        const res = await fetch("http://localhost:3000/api/admin/schedule_nba_game", {
            method: "POST",
            body: JSON.stringify({ date: date, home: home, away: away })
        });
    }
    useEffect(() => { getTeams(); }, []);

    return (
        <div className={styles.selectWrapper}>
            <h1>Schedule games</h1>
            <input type="date" className={styles.dateInput} onChange={(e) => setDate(e.target.value)}></input>
            <Select options={selectOptions} placeholder="home" styles={darkSelectStyles} onChange={(e) => setHome(e?.value ?? null)}></Select>
            <Select options={selectOptions} placeholder="away" styles={darkSelectStyles} onChange={(e) => setAway(e?.value ?? null)}></Select>
            <button onClick={insertGame}></button>
        </div>
    )
}