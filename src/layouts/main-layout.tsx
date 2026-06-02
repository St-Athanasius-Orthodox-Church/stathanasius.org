'use client'

import Link from 'next/link'
import { ChevronDown, MailIcon, MenuIcon, PhoneIcon, XIcon } from 'lucide-react'
import { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { GoldSeparator } from '@/components/ui/gold-separator'

const saocLogoUrl = '/assets/saoc-logo.png'

type NavItem =
  | { label: string; href: string }
  | { label: string; children: { label: string; href: string }[] }

const navItems: NavItem[] = [
  {
    label: "About Us",
    children: [
      { label: 'Our Parish', href: '/about' },
      { label: 'Mission & Values', href: '/about/mission-values' },
      { label: 'Clergy & Lay Leadership', href: '/clergy' },
    ],
  },
  {
    label: "Learn",
    children: [
      { label: "What is Orthodoxy?", href: "/#what-is-orthodoxy" },
      { label: 'How to Become Orthodox', href: '/become-orthodox' },
      { label: 'Resources', href: '/resources' },
      { label: 'FAQs', href: '/faqs' },
    ],
  },
  {
    label: "Media",
    children: [
      { label: 'Photos', href: '/photo-albums' },
      { label: 'Homilies & Lectures', href: '/homilies' },
      { label: 'Bulletins', href: '/bulletins' },
    ],
  },
  { label: 'Calendar', href: '/calendar' },
  { label: 'Donate', href: '/donate' },
]

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-crimson-pro">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

function Navbar() {
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
    <header className="sticky top-0 z-50 w-full bg-byzantine-blue shadow-lg">
      {/* Gold accent line at top */}
      <GoldSeparator variant="full" />

      <nav className="container mx-auto flex items-center gap-6 px-4 py-3 font-crimson-pro">
        {/* Logo */}
        <Link href="/" className="block h-10 w-fit shrink-0 md:h-12">
          <img
            src={saocLogoUrl}
            alt="St. Athanasius Orthodox Church"
            className="h-full w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:ml-auto md:flex md:items-center md:gap-1">
          {navItems.map((item) =>
            "children" in item ? (
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
        </div>

        {/* Mobile menu button */}
        <button
          className="ml-auto rounded p-2 transition-colors hover:bg-white/10 md:hidden"
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen)
            if (mobileMenuOpen) setExpandedSection(null)
          }}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <XIcon className="h-6 w-6 text-gray-100" />
          ) : (
            <MenuIcon className="h-6 w-6 text-gray-100" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="absolute top-full right-0 left-0 z-50 bg-byzantine-blue-dark shadow-xl md:hidden"
          style={{ borderTop: "1px solid var(--orthodox-gold)" }}
        >
          <nav className="container mx-auto flex flex-col py-2">
            {navItems.map((item) =>
              "children" in item ? (
                <div key={item.label}>
                  <button
                    className="flex w-full items-center justify-between px-6 py-3 text-left text-gray-100 hover:text-white"
                    onClick={() => toggleSection(item.label)}
                  >
                    {item.label}
                    <ChevronDown
                      className={`size-4 ${expandedSection === item.label ? "rotate-180" : ""}`}
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
    </header>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-20 w-full bg-byzantine-blue">
      {/* Gold accent line at top */}
      <GoldSeparator />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {/* Church Info */}
          <div>
            <h3 className="mb-2 font-cinzel text-lg font-semibold text-orthodox-gold">
              St. Athanasius Orthodox Church
            </h3>
            <address className="text-sm leading-relaxed text-gray-300 not-italic">
              <p>
                300 Sumida Gardens Lane
                <br />
                Santa Barbara, CA 93111
              </p>
              <p className="mt-3">
                <a
                  href="tel:805-685-5400"
                  className="transition-colors hover:text-white"
                >
                  <PhoneIcon className="mr-2 inline-block h-4 w-4" />
                  805-685-5400
                </a>
              </p>
              <p>
                <a
                  href="mailto:office@stathanasius.org"
                  className="transition-colors hover:text-white"
                >
                  <MailIcon className="mr-2 inline-block h-4 w-4" />
                  office@stathanasius.org
                </a>
              </p>
            </address>
          </div>

          {/* Service Times */}
          <div>
            <h3 className="mb-4 font-cinzel text-lg font-semibold text-orthodox-gold">
              Service Times
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div>
                <p className="font-medium text-gray-100">Saturday</p>
                <p>Great Vespers - 5:30 PM</p>
              </div>
              <div>
                <p className="font-medium text-gray-100">Sunday</p>
                <p>Matins - 9:00 AM</p>
                <p>Divine Liturgy - 10:00 AM</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-cinzel text-lg font-semibold text-orthodox-gold">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link
                href="/about"
                className="text-gray-300 transition-colors hover:text-white"
              >
                About Us
              </Link>
              <Link
                href="/calendar"
                className="text-gray-300 transition-colors hover:text-white"
              >
                Calendar
              </Link>
              <Link
                href="/photo-albums"
                className="text-gray-300 transition-colors hover:text-white"
              >
                Photo Albums
              </Link>
              <Link
                href="/donate"
                className="text-gray-300 transition-colors hover:text-white"
              >
                Donate
              </Link>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <GoldSeparator className="my-8 h-px opacity-50" />

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400">
          <p>
            © {currentYear} St. Athanasius Orthodox Church. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            A parish of the{" "}
            <a
              href="https://www.antiochian.org"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gray-300"
            >
              Antiochian Orthodox Christian Archdiocese
            </a>
          </p>
        </div>
      </div>

      {/* Bottom gold accent */}
      <GoldSeparator variant="full" />
    </footer>
  )
}
