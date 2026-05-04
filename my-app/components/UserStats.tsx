"use client";
import { useEffect, useState } from "react";
export default function UserStats({ uid }: any) {
    const [balance, setBalance] = useState<number | null>(null);
    useEffect(() => {
        const getBalance = async () => {
            const res = await fetch(`/api/user/balance?uid=${uid}`)
            const data = await res.json();
            setBalance(data.balance);
        }
        getBalance();
    }, [uid])

    return (
        <div className="bg-gray-900 border border-gray-700 rounded-xl px-5 py-3 w-64 shadow-lg">
            <p className="text-gray-400 text-sm">Balance</p>
            <p className="text-2xl font-semibold text-green-400">
                {balance !== null ? `$${balance}` : "Loading..."}
            </p>
        </div>
    );
}