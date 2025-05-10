// src\components\dashboard\DashHeader.tsx

'use client';

import { useUserAuth } from '@/app/context/AuthContext';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  User,
  LogOut,
  Settings,
  HelpCircle,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from 'next-themes';

export default function DashHeader() {
  const { userInfo, clearUserSession } = useUserAuth();
  const { theme, setTheme } = useTheme();

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  const handleLogout = () => {
    clearUserSession();
    window.location.href = '/login';
  };

  return (
    <header className="h-14 bg-background text-foreground px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center space-x-2">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition">
              <AvatarImage
                src={userInfo.photo || undefined}
                alt={userInfo.name || 'User'}
              />
              <AvatarFallback>
                <User size={16} />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col">
              <span>{userInfo.name}</span>
              <span className="text-xs text-muted-foreground">
                {userInfo.email}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User size={16} className="mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings size={16} className="mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle size={16} className="mr-2" />
              Help
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={16} className="mr-2" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon size={16} className="mr-2" />
                  Dark Mode
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut size={16} className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
