// src\utils\jwtToken.ts
import { jwtDecode } from 'jwt-decode';

export type DecodedUserInfo = {
    name: string;
    email: string;
    photo?: string;
    appUserId: string;
    provider: string;
    isOnboarded: boolean;
}
export function getUserFromToken(): DecodedUserInfo | null {
    try {
        const jwtToken = localStorage.getItem('my_jwt');
        if (!jwtToken) return null;

        const decodedUser: DecodedUserInfo = jwtDecode(jwtToken);
        return decodedUser;
    } catch (err) {
        console.error('Failed to decode token',err);
        return null;

    }
    }
