"use client";
import styles from "../../styles/adminNBAGames.module.css";
import { NBAParser } from "@/lib/NBAParser";
import { useState, useEffect } from "react";
import NBAStatTable from "./NBAStatTable";
import Select from 'react-select';
// Component page for adding nba box scores
export default function AdminNBAGames() {
    type TeamOptions = {
        value: number;
        label: string;
    };

    const [selectOptions, setSelectOptions] = useState<TeamOptions[]>([]);

    const NUM_ROWS = 20;
    const BoxScoreTable = () => {

        const handlePaste = (e: ClipboardEvent) => {
            e.preventDefault();
            const text = e.clipboardData?.getData("text") || "";
            const parsedRows = NBAParser(text);
        }
        return ("");
    }

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
    return (
        <div>
            <div className={styles.selectWrapper}>
                <Select options={selectOptions} placeholder="home" styles={darkSelectStyles}></Select>
                <Select options={selectOptions} placeholder="away" styles={darkSelectStyles}></Select>
            </div>
        </div>
    )
}