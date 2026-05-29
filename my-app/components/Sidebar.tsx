import Link from "next/link";
import { ClipboardList, ArrowDownUp, Trophy } from "lucide-react";

export default function Sidebar() {
    return (
        <aside className="w-48 h-screen border-r p-4">
            <Trophy className="mb-10" width={32} height={32} />
            <nav className="flex flex-col gap-2">
                <Link className="flex gap-3" href="tracker"><ClipboardList />Tracker</Link>
                <Link className="flex gap-3" href="simbetting"><ArrowDownUp />Simulate Betting</Link>
            </nav>
        </aside>
    )
}