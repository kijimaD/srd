'use client'

import dynamic from 'next/dynamic'

const MainContent = dynamic(() => import('./components/MainContent'), {
  ssr: false,
})

export default function Home() {
  return <MainContent />
}
