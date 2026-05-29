import Sidebar from "@/components/Sidebar";
import BetTracker from "@/components/tracker/betTracker";

export default async function Tracker() {

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
            <BetTracker />
            </div>
        </div>
    )
}