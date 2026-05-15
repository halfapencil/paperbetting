import { useState } from 'react';
import Select from 'react-select';
import { darkSelectStyles } from '@/styles/darkSelectStyle';
type Leg = {
    games_id: number
    amount: number
    odds: number
    line: number
    market: string
    result: string
    betType: string
}

type Props = {
    form: Leg,
    setForm: React.Dispatch<React.SetStateAction<Leg>>
    date: string
}

const MARKETS_OPTIONS = [
    { value: "NBA", label: "NBA" }
]

const TYPE_OPTIONS = [
    { value: "moneyline", label: "Moneyline" },
    { value: "prop", label: "Player Prop" },
    { value: "spread", label: "Spread" }
]

export default function AddLeg({ form, setForm, date }: Props) {

    function getGames() {
        return (date);
    }

    function renderBetOptions() {
        switch (form.betType) {
            case "moneyline":
                return (
                    <>
                        <button className='bg-red-800 rounded-2xl p-4 mr-1'>
                            Lakers
                        </button>

                        <button className='bg-green-800 rounded-2xl p-4 ml-1'>
                            Celtics
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
                <Select className="mb-4 ml-4" options={MARKETS_OPTIONS}
                    styles={darkSelectStyles}
                    defaultValue={MARKETS_OPTIONS[0]}
                    placeholder="Market"
                    onChange={(e) => setForm(prev => ({
                        ...prev,
                        market: e?.value || ""
                    }))} />
                <Select className="mb-4 ml-4" placeholder=" Type"
                    styles={darkSelectStyles}

                    defaultValue={TYPE_OPTIONS}
                    options={TYPE_OPTIONS}
                    onChange={(e) => setForm(prev => ({
                        ...prev,
                        betType: e?.value || ""
                    }))} />
                <Select className="mb-4 ml-4" placeholder="Game"
                    styles={darkSelectStyles}
                />
            </div>
            <div className='grid grid-cols-2 mb-4'>
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