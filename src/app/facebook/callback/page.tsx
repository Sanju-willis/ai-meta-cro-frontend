// src\app\facebook\callback\page.tsx
'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function FacebookCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const externalToken = params.get('token');

        if (externalToken) {
            localStorage.setItem('my_jwt', externalToken)

            router.push('/dashboard')
        } else {
            console.error('No External Token Founde in URL');
            router.push('/login');
        }


    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen">

        <p>Processing login..</p>
        </div>
    );

}