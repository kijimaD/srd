'use client'

import dynamic from 'next/dynamic'

const MainContent = dynamic(() => import('./components/MainContent'), {
  ssr: false,
})

const Providers = dynamic(() => import('./providers').then(mod => mod.Providers), {
  ssr: false,
})

export default function Home() {
  return (
    <Providers>
      <MainContent />
    </Providers>
  )
}
