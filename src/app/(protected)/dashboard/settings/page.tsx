"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// --- SVG Icons for Connections (Original Brand Icons) ---

const GithubIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const GoogleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const OpenAiIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
  </svg>
);

const GeminiIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="url(#gemini-gradient)"/>
    <defs>
      <linearGradient id="gemini-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4285F4"/>
        <stop offset="0.5" stopColor="#9B72CB"/>
        <stop offset="1" stopColor="#D96570"/>
      </linearGradient>
    </defs>
  </svg>
);

// --- Main Settings Component ---

export default function SettingsPage() {
  // Mock connection status
  const [connections, setConnections] = useState({
    github: true,
    google: false,
    openai: true,
    gemini: false,
  });

  const toggleConnection = (service) => {
    setConnections(prev => ({ ...prev, [service]: !prev[service] }));
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage your account settings and connected services.
          </p>
        </div>

        {/* User Profile Section */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl text-gray-900">User Profile</CardTitle>
            <CardDescription className="text-gray-600">Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">CN</AvatarFallback>
              </Avatar>
              <div className="space-y-2 flex-1">
                <Label htmlFor="picture" className="text-gray-900 text-base">Profile Picture</Label>
                <Input id="picture" type="file" className="w-full max-w-md border-gray-300" />
                <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-900 text-base">Full Name</Label>
                <Input id="name" defaultValue="Automation Master" className="border-gray-300 h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900 text-base">Email</Label>
                <Input id="email" type="email" defaultValue="master@n8n-control.com" disabled className="border-gray-300 bg-gray-50 h-11" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-6">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-8">Save Changes</Button>
          </CardFooter>
        </Card>

        {/* Connections Section */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl text-gray-900">Connections</CardTitle>
            <CardDescription className="text-gray-600">
              Connect your accounts from third-party services to use them in your workflows.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <ConnectionItem 
              icon={<GithubIcon className="h-7 w-7 text-gray-900" />} 
              name="GitHub"
              isConnected={connections.github}
              onToggle={() => toggleConnection('github')}
            />
            <Separator className="bg-gray-200" />
            <ConnectionItem 
              icon={<GoogleIcon className="h-7 w-7" />}
              name="Google"
              isConnected={connections.google}
              onToggle={() => toggleConnection('google')}
            />
            <Separator className="bg-gray-200" />
            <ConnectionItem 
              icon={<OpenAiIcon className="h-7 w-7 text-gray-900" />}
              name="OpenAI"
              isConnected={connections.openai}
              onToggle={() => toggleConnection('openai')}
              description="API key is configured and active."
            />
            <Separator className="bg-gray-200" />
            <ConnectionItem 
              icon={<GeminiIcon className="h-7 w-7" />}
              name="Google Gemini"
              isConnected={connections.gemini}
              onToggle={() => toggleConnection('gemini')}
              description="Requires an API key to be set."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// --- Connection Item Sub-component ---

function ConnectionItem({ icon, name, description, isConnected, onToggle }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-5">
        {icon}
        <div>
          <h3 className="font-semibold text-base text-gray-900">{name}</h3>
          {description && <p className="text-sm text-gray-600 mt-0.5">{description}</p>}
        </div>
      </div>
      <Button 
        variant={isConnected ? "outline" : "default"}
        onClick={onToggle}
        className={isConnected ? "border-gray-300 text-gray-900 hover:bg-gray-50 h-11 px-8" : "bg-blue-600 hover:bg-blue-700 text-white h-11 px-8"}
      >
        {isConnected ? 'Disconnect' : 'Connect'}
      </Button>
    </div>
  )
}