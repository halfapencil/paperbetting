import AdminNBAGames from "@/components/admin_nba/AdminNBAGames";
import ScheduleGameNBA from "@/components/admin_nba/ScheduleGameNBA";

export default async function AddNBAPage() {
    return (
        <div>
            <AdminNBAGames />
            <ScheduleGameNBA />
        </div>
    )
}