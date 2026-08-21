'use client'

import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

import { logoutAction } from '@/app/(frontend)/(site)/actions/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { navItems } from '@/layouts/nav-items'

type DesktopNavProps = {
  authLabel: string | null
  authHref: string | null
}

export function DesktopNav({ authLabel, authHref }: DesktopNavProps) {
  return (
    <div className="hidden lg:ml-auto lg:flex lg:items-center md:gap-1">
      {navItems.map((item) =>
        'children' in item ? (
          <DropdownMenu key={item.label}>
            <DropdownMenuTrigger className="gap-1 rounded px-4 py-2 align-middle font-medium tracking-wide text-gray-100 transition-all duration-200 hover:bg-white/10 hover:text-white">
              <div className="flex items-center gap-1">
                {item.label} <ChevronDown className="size-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {item.children.map((child) => (
                <DropdownMenuItem key={child.href} asChild>
                  <Link href={child.href}>{child.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            className="rounded px-4 py-2 font-medium tracking-wide text-gray-100 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            {item.label}
          </Link>
        ),
      )}
      {authLabel &&
        (authLabel === 'Sign Out' ? (
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded px-4 py-2 font-medium tracking-wide text-gray-100 transition-all duration-200 hover:bg-white/10 hover:text-white"
            >
              {authLabel}
            </button>
          </form>
        ) : (
          authHref && (
            <Link
              href={authHref}
              className="rounded px-4 py-2 font-medium tracking-wide text-gray-100 transition-all duration-200 hover:bg-white/10 hover:text-white"
            >
              {authLabel}
            </Link>
          )
        ))}
    </div>
  )
}
