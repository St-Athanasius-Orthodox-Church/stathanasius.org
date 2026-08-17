import Link from 'next/link'
import { MailIcon, PhoneIcon } from 'lucide-react'

import { GoldSeparator } from '@/components/ui/gold-separator'

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-20 w-full bg-byzantine-blue">
      <GoldSeparator />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
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
                href="/blog"
                className="text-gray-300 transition-colors hover:text-white"
              >
                Blog
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

        <GoldSeparator className="my-8 h-px opacity-50" />

        <div className="text-center text-sm text-gray-400">
          <p>
            © {currentYear} St. Athanasius Orthodox Church. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            A parish of the{' '}
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

      <GoldSeparator variant="full" />
    </footer>
  )
}
