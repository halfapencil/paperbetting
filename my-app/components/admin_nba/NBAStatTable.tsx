"use client";
import { nbaPlayerStatRow } from "@/types/nbaPlayerStats";
import styles from "../../styles/adminNBAGames.module.css";
import NBAStatRow from "./NBAStatRow";
import { EMPTY_NBA_STAT_ROW } from "@/lib/nba/emptyNBAStatRow";
import { NBAParser } from "@/lib/services/NBAParser";
import { Dispatch, SetStateAction } from "react";

type NBAStatTableProps = {
    title: string;
    rows: nbaPlayerStatRow[];
    setRows: Dispatch<SetStateAction<nbaPlayerStatRow[]>>;
}
// Table for adding box scores to database
export default function NBAStatTable({
    title,
    rows,
    setRows
}: NBAStatTableProps) {

    const NUM_ROWS = 20;
    const INITIAL_ROWS = Array.from({ length: NUM_ROWS }, () => ({ ...EMPTY_NBA_STAT_ROW }));
    function updateRow(
        index: number,
        field: keyof nbaPlayerStatRow,
        value: string | number
    ) {
        setRows((prevRows) => {
            const updatedRows = [...prevRows];

            updatedRows[index] = {
                ...updatedRows[index],
                [field]: value
            };

            return updatedRows;
        });
    }
    
    function normalizePlayerName(name: string) {
        return name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }
    function handlePaste(
        e: React.ClipboardEvent<HTMLTableElement>
    ) {
        e.preventDefault();

        const text =
            e.clipboardData.getData("text");

        const parsedRows = NBAParser(text);

        const updatedRows = [...INITIAL_ROWS];

        parsedRows.forEach((row, index) => {
            if (index < updatedRows.length) {

                const cleanedPlayerName =
                    normalizePlayerName(
                        index < 5
                            ? row.playerName.slice(0, -1)
                            : row.playerName
                    );
                updatedRows[index] = {
                    ...row,
                    playerName: cleanedPlayerName
                };
            }
        });

        setRows(updatedRows);
    }
    return (
        <div>
            <div className={styles.adminTableWrapper}>
                <table className={styles.adminTable} onPaste={handlePaste}>
                    <thead>
                        <tr>
                            <th className={styles.playerColumn}>Player Name</th>
                            <th className={styles.minutesColumn}>Minutes</th>
                            <th className={styles.statColumn}>FG</th>
                            <th className={styles.statColumn}>FGA</th>
                            <th className={styles.statColumn}>FG%</th>
                            <th className={styles.statColumn}>3PT</th>
                            <th className={styles.statColumn}>3PA</th>
                            <th className={styles.statColumn}>3P%</th>
                            <th className={styles.statColumn}>FT</th>
                            <th className={styles.statColumn}>FTA</th>
                            <th className={styles.statColumn}>FT%</th>
                            <th className={styles.statColumn}>OREB</th>
                            <th className={styles.statColumn}>DREB</th>
                            <th className={styles.statColumn}>TRB</th>
                            <th className={styles.statColumn}>AST</th>
                            <th className={styles.statColumn}>STL</th>
                            <th className={styles.statColumn}>BLK</th>
                            <th className={styles.statColumn}>TOV</th>
                            <th className={styles.statColumn}>PF</th>
                            <th className={styles.statColumn}>PTS</th>
                            <th className={styles.statColumn}>+/-</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <NBAStatRow
                                key={index}
                                row={row}
                                index={index}
                                updateRow={updateRow}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}