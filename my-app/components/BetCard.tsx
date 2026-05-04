"use client";

export default function BetCard({ bet }: any) {
    function calculatePayout(amount: number, odds: number) {
        if (odds > 0) return amount + (amount * odds) / 100;
        return amount + (amount * 100) / Math.abs(odds);
    }
    const settleBets = async (id: number, result: string) => {
        await fetch("/api/bets/settle", {
            method: "POST",
            body: JSON.stringify({ id: id, result: result, odds: bet.odds, amount: bet.amount})
        });

        window.location.reload();
    }


    return (
        <div>
            <div
                style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px",
                }}
            >
                <p>Game ID: {bet.games_id}</p>
                <p>BetID: {bet.id}</p>
                <p>Amount: ${bet.amount}</p>
                <p>Odds: {bet.odds}</p>
                <p>Result: {bet.result}</p>
                <p>Payout: {bet.payout ?? "-"}</p>

                {/* buttons */}
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200" onClick={() => settleBets(bet.id, "win")}>Win</button>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200" onClick={() => settleBets(bet.id, "loss")}>Loss</button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200" onClick={() => settleBets(bet.id, "push")}>Push</button>

            </div>
        </div>
    )
}
