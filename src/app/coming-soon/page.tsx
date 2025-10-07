"use client";

import Image from "next/image";
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { useSession } from "@/lib/auth-client"; // adjust import

export default function Home() {
  const { data, isPending } = useSession();
  const username = data?.user?.name ?? null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-4 font-sans">
      
      {/* Sign-In Button / User Display */}
      <header className="absolute top-0 right-0 p-6">
        {username ? (
          <div className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
            Hi, {username}
          </div>
        ) : (
          <Link href="/auth">
            <button 
              className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <LogIn size={16} />
              <span>Sign In</span>
            </button>
          </Link>
        )}
      </header>

      <main className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          We're Launching Soon
        </h1>
        
        <p className="mt-4 text-lg leading-8 text-gray-600">
          {username
            ? `Welcome back, ${username}! Our new website is under construction.`
            : "Our new website is under construction, but we're excited to share it with you. Stay tuned for something amazing!"}
        </p>
        
        <div className="mt-8">
          <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-800">
            <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
            Coming Soon
          </div>
        </div>
      </main>
    </div>
  );
}
