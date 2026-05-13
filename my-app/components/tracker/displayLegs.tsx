import { bet } from "@/types/newBet";

type Props = {
    bets: bet[]
}
export default function DisplayLegs({ bets }: Props) {
    return (
        <div>
            <h1>Bet</h1>
        </div>
    )
}