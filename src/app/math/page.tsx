// src\app\math\page.tsx
'use client';

import { useState } from 'react';
import { double } from '@/utils/mathfunctions';

export default function MathPage() {

    const [inputValue, setInputValue] = useState<number | ''>('');
    const [result, setResult] = useState<number | null>(null);

    function handleCalculate() {
        if (typeof inputValue === 'number') {
            const output = double(inputValue);
            setResult(output);
        }
    }

    return (
        <div>
            <h1>Double a Number</h1>
            <input
                type="number"
                value={inputValue}
                onChange={(e) =>
                    setInputValue(e.target.value === '' ? '' : Number(e.target.value))
                }
                placeholder="Enter a number"
            />
            <button onClick={handleCalculate}>Calculate</button>

            {result !== null && <p>Result: {result}</p>}
        </div>
    );
}
