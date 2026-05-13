"use client";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Select from "react-select";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles/betTracker.css";
import { useCallback, useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import AddLeg from './addLeg';
import { bet } from '@/types/newBet';
import DisplayLegs from './displayLegs';

const localizer = momentLocalizer(moment)

type parlay = {
    legs: bet[],
    totalOdds: number
}
const myEventsList = [
    {
        id: 1,
        title: 'Long Event',
        start: new Date(2026, 4, 10),
        end: new Date(2026, 4, 11),
    }
]


function Selectable({ setOpen, setSelectedSlot }: any) {

    const onSelectSlot = useCallback((slotInfo: any) => {
        setSelectedSlot(slotInfo);
        setOpen(true);
    }, [])

    return (
        <div className='p-4 bg-black min-h-screen'>
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '80vh' }}
                onSelectSlot={onSelectSlot}
                selectable
            />
        </div>
    )
}
function submitBets() {
    //send to backend, retrieve game, automatically settle bets.
}
export default function BetTracker() {

    const profit = 150;
    const [open, setOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<any>(null);
    const [bets, setBets] = useState<bet[]>([]);
    const [newForm, setNewForm] = useState(false);
    const [form, setForm] = useState({
        games_id: 0,
        amount: 0,
        odds: 0,
        line: 0,
        market: 0,
        result: 0
    })
    return (

        <div>
            {open && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
                    <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800 shadow-2xl">
                        <div>
                            {bets.map((bet) => (
                                <DisplayLegs bets={bets} />
                            ))}
                        </div>
                        <div>
                            {newForm && <AddLeg />
                            }
                        </div>
                        <div className="grid grid-cols-2 border border-green-600 bg-green-900 rounded-2xl p-4" onClick={() => { setNewForm(true) }}>
                            <Plus />
                            <h1>Add leg</h1>
                        </div>
                        < button
                            onClick={() => { }}
                            className="mt-4 bg-red-500 px-4 py-2 rounded-lg text-white">
                            Close
                        </button>
                    </div>

                </div>
            )
            }
            <div>
                <div className='max-w-7xl mx-auto text-center'>
                    <h1 className='text-3xl font-bold'> Bet Tracker</h1>
                    <p className='text-gray-400 mt-1'> Track bets, Profits, Streaks, Performances</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
                    <div className="bg-[#111827] rounded-2xl p-4 border border-gray-800">
                        <p className="text-gray-400 text-sm">Total Profit / Loss</p>
                        <h2 className={`text-2xl font-bold ${profit >= 0 ? 'text-green-400' : 'text-red-400'}`} >
                            ${profit}
                        </h2>
                    </div>
                    <div className="bg-[#111827] rounded-2xl p-4 border border-gray-800">
                        <p className="text-gray-400 text-sm">Win Rate</p>
                        <h2 className="text-2xl font-bold">
                            58.2%
                        </h2>
                    </div>

                    <div className="bg-[#111827] rounded-2xl p-4 border border-gray-800">
                        <p className="text-gray-400 text-sm">Current Streak</p>
                        <h2 className="text-2xl font-bold">
                            W4
                        </h2>
                    </div>

                    <div className="bg-[#111827] rounded-2xl p-4 border border-gray-800">
                        <p className="text-gray-400 text-sm">Total Bets</p>
                        <h2 className="text-2xl font-bold">
                            312
                        </h2>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 '>
                    <Select
                        instanceId="account-select"
                        placeholder="Account" />
                </div>
                <Selectable
                    setOpen={setOpen}
                    setSelectedSlot={setSelectedSlot} />
            </div>
        </div >
    )
}