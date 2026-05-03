"use client";
import BetCard from './BetCard';
import { useState } from 'react';

export default function CreateBetForm() {
    const [amount, setAmount] = useState("");
    const [odds, setOdds] = useState("");
    const [gameId, setGameId] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!amount || !odds || !gameId) {
            setError("Empty fields");
            return;
        }
        setError("");
        await fetch("/api/bets", {
            method: "POST",
            body: JSON.stringify({
                user_id: Number(2),
                amount: Number(amount),
                odds: Number(odds),
                games_id: Number(gameId),
                result: "pending",
            })
        });

        window.location.reload();
    }
    return (
        <div>
            {
                error && (<p className="text-red-500 mb-2">{error}</p>)
            }
            <form onSubmit={handleSubmit}>
                <input placeholder='Amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                <input placeholder='Odds' value={odds} onChange={(e) => setOdds(e.target.value)} />
                <input placeholder='Game' value={gameId} onChange={(e) => setGameId(e.target.value)} />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    type="submit"> Place bet</button>
            </form>
        </div>
    )
}