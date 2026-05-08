"use client";
import { useEffect, useState } from "react";
import Select from "react-select";
import styles from "../../styles/adminNBAGames.module.css";
import NBAStatRow from "./NBAStatRow";
// Table for adding box scores to database
export default function NBAStatTable({
    title
}: { title: string }) {
    
    type TeamOptions = {
        value: number;
        label: string;
    };

    const [selectOptions, setSelectOptions] = useState<TeamOptions[]>([]);

    return (
        <div>
            <div className={styles.adminTableWrapper}>
                <table className={styles.adminTable}>
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
                    </tbody>
                </table>
            </div>
        </div>
    )
}