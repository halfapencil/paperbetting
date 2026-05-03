"use client";

import { useState } from 'react';

export default function CreateBetForm() {
    const [amount, setAmount] = useState("");
    const [odds, setOdds] = useState("");
    const [gameId, setGameId] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await fetch("/api/bets", {
            method: "POST",
            body: JSON.stringify({
                amount: Number(amount),
                odds: Number(amount),
                games_id: Number(gameId),
                result: "pending",
            })
        });
        window.location.reload();
    }
    return (
        <form onSubmit={handleSubmit}>
            <input placeholder='Amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input placeholder='Odds' value={odds} onChange={(e) => setOdds(e.target.value)} />
            <input placeholder='Game' value={gameId} onChange={(e) => setGameId(e.target.value)} />
            <button type="submit"> Place bet</button>
        </form>
    )
}