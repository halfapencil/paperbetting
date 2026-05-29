import { useEffect, useState } from 'react';
import Select from 'react-select';
import { darkSelectStyles } from '@/styles/darkSelectStyle';
import { Darumadrop_One } from 'next/font/google';
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

type Props = {
    form: Leg,
    setForm: React.Dispatch<React.SetStateAction<Leg[]>>
    date: string,
    index: number,
    games: any
}
const MARKETS_OPTIONS = [
    { value: "NBA", label: "NBA" }
]

const TYPE_OPTIONS = [
    { value: "moneyline", label: "Moneyline" },
    { value: "prop", label: "Player Prop" },
    { value: "spread", label: "Spread" }
]

export default function AddLeg({ form, setForm, date, games, index }: Props) {
    const [homeTeam, setHomeTeam] = useState("");
    const [awayTeam, setAwayTeam] = useState("");
    function renderBetOptions() {
        switch (form.betType) {
            case "moneyline":
                return (
                    <>
                        <button className='bg-red-800 rounded-2xl p-4 mr-1'>
                            {homeTeam}
                        </button>

                        <button className='bg-green-800 rounded-2xl p-4 ml-1'>
                            {awayTeam}
                        </button>
                    </>)
            case "prop":
                return (
                    <>
                        <button className='bg-red-800 rounded-2xl p-4 mr-1'>
                            Over
                        </button>

                        <button className='bg-green-800 rounded-2xl p-4 ml-1'>
                            Under
                        </button>
                    </>
                )
            case "spread":
                return (
                    <>
                        <button className='bg-red-800 rounded-2xl p-4 mr-1'>
                            Lakers
                        </button>

                        <button className='bg-green-800 rounded-2xl p-4 ml-1'>
                            Celtics
                        </button>
                    </>
                )
        }
    }
    return (
        <div className="justify-center">
            <div className='grid grid-cols-3'>
                <Select className="mb-4 ml-4"
                    options={MARKETS_OPTIONS}
                    styles={darkSelectStyles}
                    defaultValue={MARKETS_OPTIONS[0]}
                    placeholder="Market"
                    onChange={(e) => setForm(prev =>
                        prev.map((leg, index) =>
                            index === 0
                                ? { ...leg, market: e?.value || "" }
                                : leg
                        )
                    )} />
                <Select
                    className="mb-4 ml-4"
                    placeholder="Type"
                    styles={darkSelectStyles}
                    defaultValue={TYPE_OPTIONS[0]}
                    options={TYPE_OPTIONS}
                    onChange={(e) =>
                        setForm(prev =>
                            prev.map((leg, index) =>
                                index === 0
                                    ? {
                                        ...leg,
                                        betType: e?.value || ""
                                    }
                                    : leg
                            )
                        )
                    }
                />
                <Select className="mb-4 ml-4" placeholder="Game"
                    options={games}
                    styles={darkSelectStyles}
                    defaultValue={games[0]}
                    onChange={(e: any) => {
                        setHomeTeam(e?.home ?? "");
                        setAwayTeam(e?.away ?? "");
                    }}
                />
            </div>
            <div className='grid grid-cols-3 mb-4'>
                {//Render players from a team.

                }
                <input className="ml-4 border border-gray-300 ml-4"
                    type='number'
                    placeholder='Line'
                    onChange={(e) => setForm(prev => ({
                        ...prev,
                        line: Number(e.target.value) || 0
                    }))} />
                <input className="ml-4 border border-gray-300 "
                    type='number'
                    placeholder='Amount'
                    onChange={(e) => setForm(prev => ({
                        ...prev,
                        amount: Number(e.target.value) || 0
                    }))}
                />
            </div>
            <div className='grid grid-cols-2 mb-4'>
                {renderBetOptions()}
            </div>

        </div>
    )
}