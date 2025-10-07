'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Settings,
  Workflow,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()

  // Hide sidebar when on the builder dynamic route (e.g., /dashboard/builder/[builder])
  const hideSidebar = pathname?.match(/^\/dashboard\/builder\/[^/]+/)

  if (hideSidebar) {
    // Return full-width layout without sidebar
    return (
      <div className="flex min-h-screen bg-gray-50">
        <main className="flex-1">
          {children}
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (Desktop) - Fixed positioning */}
      <aside
        className={cn(
          'hidden md:flex flex-col fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-40',
          sidebarCollapsed ? 'w-20' : 'w-64'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 min-h-[65px]">
          {!sidebarCollapsed && (
            <span className="text-xl font-semibold text-blue-600 transition-opacity duration-200">
              n8n Control
            </span>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-blue-600 hover:bg-blue-50 rounded-md p-1.5 transition-colors"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!sidebarCollapsed}
          >
            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-1 overflow-y-auto" role="navigation" aria-label="Main navigation">
          <NavItem
            href="/dashboard"
            icon={<LayoutDashboard size={18} />}
            collapsed={sidebarCollapsed}
            isActive={pathname === '/dashboard'}
          >
            Dashboard
          </NavItem>
          <NavItem
            href="/dashboard/builder"
            icon={<Workflow size={18} />}
            collapsed={sidebarCollapsed}
            isActive={pathname === '/dashboard/builder'}
          >
            n8n Builder
          </NavItem>
          <NavItem
            href="/dashboard/settings"
            icon={<Settings size={18} />}
            collapsed={sidebarCollapsed}
            isActive={pathname === '/dashboard/settings'}
          >
            Settings
          </NavItem>
        </nav>
      </aside>

      {/* Main content - Adjusted for fixed sidebar */}
      <main 
        className={cn(
          "flex-1 p-6 pb-20 md:pb-6 transition-all duration-300 ease-in-out",
          "md:ml-64",
          sidebarCollapsed && "md:ml-20"
        )}
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Bottom Nav (Mobile) - Enhanced styling */}
      <nav 
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-3 px-2 md:hidden z-50 shadow-lg"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <MobileNavItem
          href="/dashboard"
          icon={<LayoutDashboard size={22} />}
          label="Dashboard"
          isActive={pathname === '/dashboard'}
        />
        <MobileNavItem
          href="/dashboard/builder"
          icon={<Workflow size={22} />}
          label="Builder"
          isActive={pathname === '/dashboard/builder'}
        />
        <MobileNavItem
          href="/dashboard/settings"
          icon={<Settings size={22} />}
          label="Settings"
          isActive={pathname === '/dashboard/settings'}
        />
      </nav>
    </div>
  )
}

function NavItem({
  href,
  icon,
  children,
  collapsed,
  isActive,
}: {
  href: string
  icon: ReactNode
  children: ReactNode
  collapsed: boolean
  isActive: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
        collapsed ? 'justify-center' : 'space-x-3',
        isActive
          ? 'bg-blue-600 text-white shadow-sm'
          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
      )}
      aria-current={isActive ? 'page' : undefined}
      title={collapsed ? children?.toString() : undefined}
    >
      <span className="flex-shrink-0">{icon}</span>
      {!collapsed && (
        <span className="transition-opacity duration-200">{children}</span>
      )}
    </Link>
  )
}

function MobileNavItem({
  href,
  icon,
  label,
  isActive,
}: {
  href: string
  icon: ReactNode
  label: string
  isActive: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center justify-center transition-colors duration-200 px-4 py-1 rounded-lg min-w-[70px]',
        isActive 
          ? 'text-blue-600' 
          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className={cn(
        "transition-transform duration-200",
        isActive && "scale-110"
      )}>
        {icon}
      </span>
      <span className={cn(
        "text-[10px] mt-1 font-medium transition-colors duration-200",
        isActive && "text-blue-600"
      )}>
        {label}
      </span>
    </Link>
  )
}