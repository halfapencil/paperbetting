import { useState } from 'react';
import Select from 'react-select';

export default function AddLeg() {

    const [radioValue, setRadioValue] = useState("");

    return (
        <div className="justify-center">
            <div className='grid grid-cols-3'>
                <Select className="mb-4 ml-4" placeholder="Market" />
                <Select className="mb-4 ml-4" placeholder=" Type" />
                <Select className="mb-4 ml-4" placeholder="Game" />
            </div>
            <div className='grid grid-cols-2 mb-4'>
                <input className="ml-4 border border-gray-300 ml-4"type='number' placeholder='Line' />
                <input className="ml-4 border border-gray-300 "type='number' placeholder='Amount' />
            </div>
            <div className='grid grid-cols-2 mb-4'>
                <button className='bg-red-800 rounded-2xl p-4 mr-1'>aa</button>
                <button className='bg-green-800 rounded-2xl p-4 ml-1'>aa</button>
            </div>

        </div>
    )
}