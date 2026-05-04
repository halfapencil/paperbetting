import CreateBetForm from "@/components/CreateBetForm";
import BetCard from "@/components/BetCard";
import UserStats from "@/components/UserStats";
async function getBets() {
    const res = await fetch("http://localhost:3000/api/bets",
        { cache: "no-store" }
    )
    if (!res.ok) {
        throw new Error("Fail to fetch bets");
    }
    return res.json();
}
async function getBalance(){
    const res = await fetch("http://localhost:3000/api/balance")
}

export default async function BetsPage() {
    const bets = await getBets();

    return (
        <div>
            <div>
                <UserStats uid={Number(2)}/>
            </div>
            <div style={{ padding: "20px" }}>
                <CreateBetForm />
            </div>
            <div style={{ padding: "20px" }}>
                <h1>Bets</h1>

                {bets.length === 0 ? (
                    <p>No bets yet</p>
                ) : (
                    bets.map((bet: any) => (
                        <BetCard key={bet.id} bet={bet} />
                    ))
                )}
            </div>
        </div>
    )
}