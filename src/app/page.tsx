'use client'

import { redirect } from 'next/navigation'

import EventView from 'src/views/EventView'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

const App = () => {
  const session = useSession()

  useEffect(() => {
    if (session.status == 'unauthenticated') {
      redirect('/login')
    }
  }, [session])

  return <EventView />
}

export default App
