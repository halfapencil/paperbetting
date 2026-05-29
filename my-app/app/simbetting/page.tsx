import { Calendar1 } from "lucide-react"
import Sidebar from "@/components/Sidebar"
import ScheduleSimBet from "@/components/simulateBets/ScheduleSimBet";
/*
Get all games for a specific date,
then get stats for all players before that date
calculate o/u lines

 */
export default async function SimBetting() {
    
    return (
        <ScheduleSimBet />
    );
}