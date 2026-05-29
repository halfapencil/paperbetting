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
import { darkSelectStyles } from '@/styles/darkSelectStyle';
import { format } from 'path';

const localizer = momentLocalizer(moment)
type Leg = {
    games_id: number
    amount: number
    odds: number
    line: number
    market: string
    result: string
    betType: string
    payout: number
}

type parlay = {
    legs: bet[],
    totalOdds: number
}
type Game = {
    id: number
    title: string
    home_team: number,
    away_team: number,
    date: string,
    home_team_abbrev: string,
    away_team_abbrev: string
    start: Date
    end: Date
}
const MAX_LEGS = 10;
async function retrieveGames(start: any, end: any) {
    const res = await fetch("http://localhost:3000/api/admin/nba_games", {
        method: "POST",
        body: JSON.stringify({ start: start, end: end })
    })
    const data = await res.json();

    return (data.data ?? data).map((game: any) => ({
        id: game.id,
        home_team: game.home_team_id,
        away_team: game.away_team_id,
        home_team_abbrev: game.home_team_abbrev,
        away_team_abbrev: game.away_team_abbrev,
        date: game.date_played,
        start: moment(game.date_played)
            .hour(12)
            .minute(0)
            .toDate(),

        end: moment(game.date_played)
            .hour(13)
            .minute(0)
            .toDate(),

        title: `${game.home_team_abbrev} VS ${game.away_team_abbrev}`,

        allDay: false
    }))
}

function Selectable({ setOpen, setSelectedSlot, setDate, date, setDateString, setDateRange, games, setGames, setGameOptions }: any) {

    const onSelectSlot = useCallback((slotInfo: any) => {
        setSelectedSlot(slotInfo);
        setOpen(true);
        setDateString(slotInfo.slots[0].toDateString());
        setDate(moment(slotInfo.slots[0]).format("YYYY-MM-DD"));
        const gameOptions = games
            .filter((game: { date: string; }) =>
                game.date === moment(slotInfo.slots[0]).format("YYYY-MM-DD")
            )
            .map((game: { id: any; away_team_abbrev: any; home_team_abbrev: any; }) => ({
                value: game.id,
                label: `${game.away_team_abbrev} @ ${game.home_team_abbrev}`,
                home: game.home_team_abbrev,
                away: game.away_team_abbrev
            }))
        setGameOptions(gameOptions);
    }, [games])

    return (
        <div className='p-4 bg-black min-h-screen'>
            <Calendar
                localizer={localizer}
                events={games}
                startAccessor="start"
                endAccessor="end"
                step={180}
                timeslots={1}
                eventPropGetter={(event) => {
                    const style = {
                        backgroundColor: "#1f2937",
                        borderRadius: "8px",
                        color: "white",
                        border: "1px solid #374151",
                        display: "block"
                    }

                    return { style }
                }}
                style={{ height: '80vh' }}
                onSelectSlot={onSelectSlot}
                selectable
                onRangeChange={(range: any) => {
                    let start: Date
                    let end: Date

                    if (Array.isArray(range)) {
                        start = range[0]
                        end = range[range.length - 1]
                    } else {
                        start = range.start
                        end = range.end
                    }
                    // Add next day to the day range
                    if (moment(end).isSame(moment(start), "day")) {
                        end = moment(start).add(1, "hour").toDate()
                    }
                    setDateRange({
                        start: moment(start).format("YYYY-MM-DD"),
                        end: moment(end).format("YYYY-MM-DD")
                    })
                    retrieveGames(moment(start).format("YYYY-MM-DD"), moment(end).format("YYYY-MM-DD")).then(setGames);
                }}
            />
        </div>
    )
}

export default function BetTracker() {

    const profit = 150;
    const [open, setOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<any>(null);
    const [bets, setBets] = useState<bet[]>([]);
    const [newForm, setNewForm] = useState(false);
    const [legs, setLegs] = useState<Leg[]>([
        {
            games_id: 0,
            amount: 0,
            odds: 0,
            line: 0,
            market: "",
            result: "pending",
            betType: "moneyline",
            payout: 0
        }
    ])
    const [gameOptions, setGameOptions] = useState<Game[]>([]);

    const [dateRange, setDateRange] = useState({});
    const [dateString, setDateString] = useState("");
    const [date, setDate] = useState("");
    const emptyBets = [
        {
            games_id: 0,
            amount: 0,
            odds: 0,
            line: 0,
            market: "",
            result: "pending",
            betType: "moneyline",
            payout: 0
        }
    ]
    const [games, setGames] = useState<Game[]>([])

    useEffect(() => {
        const start = moment()
            .startOf("month")
            .startOf("week")
            .format("YYYY-MM-DD")

        const end = moment()
            .endOf("month")
            .endOf("week")
            .format("YYYY-MM-DD")

        const range = { start, end }

        setDateRange(range)

        retrieveGames(range.start, range.end)
            .then((games) => {
                setGames(games)
            })
    }, [])

    async function submitBets() {
        await fetch("http://localhost:3000/api/tracker/submit", {
            method: "POST",
            body: JSON.stringify({ bets: legs })
        })
    }
    return (
        <div>
            <button onClick={() => console.log(games)}> debug</button>
            {open && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
                    <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800 shadow-2xl">
                        <h1>Bets for : {dateString}</h1>
                        <div>
                            {bets.map((bet) => (
                                <DisplayLegs bets={bets} />
                            ))}
                        </div>
                        <div>
                            {newForm &&
                                legs.map((leg, index) => (
                                    <AddLeg
                                        key={index}
                                        form={leg}
                                        index={index}
                                        setForm={setLegs}
                                        date={date}
                                        games={gameOptions}
                                    />
                                ))
                            }
                        </div>
                        <div className="grid grid-cols-2 border border-green-600 bg-green-900 rounded-2xl p-4" onClick={() => { setNewForm(true) }}>
                            <Plus />
                            <h1 onClick={() =>
                                setLegs(prev => {
                                    if (prev.length >= MAX_LEGS) {
                                        return prev
                                    }

                                    return [
                                        ...prev,
                                        {
                                            games_id: 0,
                                            amount: 0,
                                            odds: 0,
                                            line: 0,
                                            market: "",
                                            result: "pending",
                                            betType: "",
                                            payout: 0
                                        }
                                    ]
                                })
                            }>Add leg</h1>
                        </div>
                        <div className='grid grid-cols-2'>
                            < button
                                onClick={() => { setNewForm(false); setOpen(false); setLegs(emptyBets) }}
                                className="mt-4 bg-red-500 px-4 py-2 rounded-lg text-white">
                                Close
                            </button>
                            <button className='mt-4 bg-green-500 px-4 py-2 rounded-lg text-white'
                                onClick={() => submitBets()}>
                                Submit
                            </button>
                        </div>
                    </div>

                </div>
            )}
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
                        placeholder="Account"
                        styles={darkSelectStyles} />
                    <Select
                        instanceId="account-select"
                        placeholder="Sport"
                        styles={darkSelectStyles} />
                </div>
                <Selectable
                    setOpen={setOpen}
                    setSelectedSlot={setSelectedSlot}
                    setDate={setDate}
                    date={date}
                    setDateString={setDateString}
                    setDateRange={setDateRange}
                    games={games}
                    setGames={setGames}
                    setGameOptions={setGameOptions} />
            </div>
        </div >
    )
}