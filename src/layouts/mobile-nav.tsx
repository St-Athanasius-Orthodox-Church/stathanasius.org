'use client'

import Link from 'next/link'
import { ChevronDown, MenuIcon, XIcon } from 'lucide-react'
import { useState } from 'react'

import { navItems } from '@/layouts/nav-items'

export function MobileNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (label: string) => {
    setExpandedSection(expandedSection === label ? null : label)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setExpandedSection(null)
  }

  return (
    <>
      <button
        type="button"
        className="ml-auto rounded p-2 transition-colors hover:bg-white/10 md:hidden"
        onClick={() => {
          setMobileMenuOpen(!mobileMenuOpen)
          if (mobileMenuOpen) setExpandedSection(null)
        }}
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? (
          <XIcon className="h-6 w-6 text-gray-100" />
        ) : (
          <MenuIcon className="h-6 w-6 text-gray-100" />
        )}
      </button>

      {mobileMenuOpen && (
        <div
          className="absolute top-full right-0 left-0 z-50 bg-byzantine-blue-dark shadow-xl md:hidden"
          style={{ borderTop: '1px solid var(--orthodox-gold)' }}
        >
          <nav className="container mx-auto flex flex-col py-2">
            {navItems.map((item) =>
              'children' in item ? (
                <div key={item.label}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-6 py-3 text-left text-gray-100 hover:text-white"
                    onClick={() => toggleSection(item.label)}
                  >
                    {item.label}
                    <ChevronDown
                      className={`size-4 ${expandedSection === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {expandedSection === item.label && (
                    <div className="bg-byzantine-blue-dark/50">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-10 py-2 text-gray-300 hover:text-white"
                          onClick={closeMobileMenu}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-6 py-3 text-gray-100 hover:text-white"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      )}
    </>
  )
}
