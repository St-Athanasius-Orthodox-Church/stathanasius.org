export type NavItem =
  | { label: string; href: string }
  | { label: string; children: { label: string; href: string }[] }

export const navItems: NavItem[] = [
  {
    label: 'About Us',
    children: [
      { label: 'Our Parish', href: '/about' },
      { label: 'Mission & Values', href: '/about/mission-values' },
      { label: 'Clergy & Lay Leadership', href: '/clergy' },
    ],
  },
  {
    label: 'Learn',
    children: [
      { label: 'What is Orthodoxy?', href: '/#what-is-orthodoxy' },
      { label: 'How to Become Orthodox', href: '/become-orthodox' },
      { label: 'Resources', href: '/resources' },
      { label: 'FAQs', href: '/faqs' },
    ],
  },
  {
    label: 'Media',
    children: [
      // { label: 'Blog', href: '/blog' },
      { label: 'Photos', href: '/photo-albums' },
      { label: 'Homilies & Lectures', href: '/homilies' },
      { label: 'Bulletins', href: '/bulletins' },
    ],
  },
  { label: 'Calendar', href: '/calendar' },
  { label: 'Donate', href: '/donate' },
]

export const saocLogoUrl = '/assets/saoc-logo.png'
