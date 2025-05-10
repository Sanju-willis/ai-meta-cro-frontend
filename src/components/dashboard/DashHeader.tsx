// src/components/dashboard/DashHeader.tsx

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
  Users,
  Rocket,
  BookOpen,
  Target,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

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
    <header className="h-16 bg-background text-foreground px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      
      {/* Left: Logo + Mega Menu */}
      <div className="flex items-center space-x-6">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200 hover:opacity-80 transition">
          🚀 Meta CRO Optimizer
        </h1>

        {/* Mega Menu */}
        <nav className="hidden md:flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition">
                About
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="grid grid-cols-2 gap-4 p-4 w-80">
              <Link
                href="/about"
                className="flex items-center space-x-2 text-sm hover:text-primary transition"
              >
                <Rocket size={16} />
                <span>Our Mission</span>
              </Link>
              <Link
                href="/team"
                className="flex items-center space-x-2 text-sm hover:text-primary transition"
              >
                <Users size={16} />
                <span>Our Team</span>
              </Link>
              <Link
                href="/roadmap"
                className="flex items-center space-x-2 text-sm hover:text-primary transition"
              >
                <Target size={16} />
                <span>Roadmap</span>
              </Link>
              <Link
                href="/blog"
                className="flex items-center space-x-2 text-sm hover:text-primary transition"
              >
                <BookOpen size={16} />
                <span>Blog</span>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/help"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition"
          >
            Help
          </Link>
        </nav>
      </div>

      {/* Right: User Menu */}
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
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center">
                <User size={16} className="mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center">
                <Settings size={16} className="mr-2" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/help" className="flex items-center">
                <HelpCircle size={16} className="mr-2" />
                Help
              </Link>
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
