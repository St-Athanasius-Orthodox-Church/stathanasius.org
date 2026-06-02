import type { Metadata } from 'next'

import { MainLayout } from '@/layouts/main-layout'

import { HomiliesList } from './homilies-list'

export const metadata: Metadata = {
  title: 'Homilies',
  description:
    'Orthodox Christian homilies and sermons from St. Athanasius Orthodox Church.',
}

export default function HomiliesPage() {
  return (
    <MainLayout>
      <HomiliesList />
    </MainLayout>
  )
}
