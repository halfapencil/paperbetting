"use client";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { format } from "path";
type Game = {
    id: number;
    date_played: number;
    home_team_id: number;
    away_team_id: number;
    home_team_abbrev: string;
    away_team_abbrev: string;
}
export default function ScheduleSimBet() {
    const [games, setGames] = useState<Game[]>([]);
    const [date, setDate] = useState<string>("");
    const [formattedDate, setFormattedDate] = useState<string>("")
    async function getGameDates() {
        const res = await fetch("http://localhost:3000/api/admin/nba_games", {
            method: "GET"
        })
        const data = await res.json();
        return data;
    }

    async function getGames(date: string) {
        const res = await fetch("http://localhost:3000/api/admin/nba_games", {
            method: "POST",
            body: JSON.stringify({ start: date, end: date })
        })
        const data = await res.json();
        setGames(data);
        console.log(data);
    }
    async function randomDate() {
        const date = await getGameDates();
        const randomDate = date[Math.floor(Math.random() * date.length)]
        console.log(randomDate);
        setFormattedDate(randomDate.date_played);
        getGames(randomDate.date_played);
    }
    useEffect(() => {
        randomDate();
    }, []);

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <div className="p-4 space-y-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold">Simulate game day bets</h1>
                </div>
                <div>
                    <button className="border" onClick={() => {
                        randomDate();
                    }}>Random Date</button>
                </div>
                <div>
                    <h2 className="font-semibold mb-2">Schedule for {formattedDate?.toString() ?? "Loading"}</h2>
                    {games.map((game) => (
                        <div key={game.id}>
                            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-700 bg-gray-900 hover:bg-gray-800 transition"
                            >
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-100">
                                        {game.away_team_abbrev}
                                    </span>
                                    <span className="text-xs text-gray-400">Away</span>
                                </div>

                                <div className="text-xs font-medium text-gray-500 px-2">
                                    VS
                                </div>

                                <div className="flex flex-col items-end">
                                    <span className="font-semibold text-gray-100">
                                        {game.home_team_abbrev}
                                    </span>
                                    <span className="text-xs text-gray-400">Home</span>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}