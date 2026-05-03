import CreateBetForm from "@/components/CreateBetForm";

async function getBets() {
    const res = await fetch("http://localhost:3000/api/bets",
        { cache: "no-store" }
    )
    if (!res.ok) {
        throw new Error("Fail to fetch bets");
    }
    return res.json();
}

export default async function BetsPage() {
    const bets = await getBets();

    return (
        <div>
            <div style={{ padding: "20px" }}>
                <CreateBetForm />
            </div>
            <div style={{ padding: "20px" }}>
                <h1>Bets</h1>

                {bets.length === 0 ? (
                    <p>No bets yet</p>
                ) : (
                    bets.map((bet: any) => (
                        <div
                            key={bet.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                marginBottom: "10px",
                            }}
                        >
                            <p>Game ID: {bet.games_id}</p>
                            <p>Amount: ${bet.amount}</p>
                            <p>Odds: {bet.odds}</p>
                            <p>Result: {bet.result}</p>
                            <p>Payout: {bet.payout ?? "-"}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}