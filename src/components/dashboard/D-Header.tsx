// src\components\dashboard\D-Header.tsx

'use client';

import { useUserAuth } from '@/app/context/AuthContext'

export default function DashHeader () {
     const { userInfo } = useUserAuth();

     if (!userInfo) {
          return (
               <div className="flex items-center justify-center min-h-screen">
        <p>Loading your dashboard...</p>
      </div>
          );
     }
     return (
         
          <div className="p-8">
               <h1 className="text=3xl font-bold md-4"> Welcome, {userInfo.name}</h1>
               <p className="text-gray-600 mb-2">📧 Email: {userInfo.email}</p>
               <p className="text-gray-600 mb-2">🔑 Provider: {userInfo.provider}</p>

               {userInfo.photo && (
                    <img
               src={userInfo.photo}
               alt={`${userInfo.name}'s profile`}
               className="mt-4 w-32 h-32 rounded-full border"
          />
      )}
    </div>
  );
}