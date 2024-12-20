import { Suspense } from 'react'
import Calendrier from '@/components/Calendrier'
import { getSessionsForMonth } from '../actions'

export default async function Dashboard() {
  const sessions = await getSessionsForMonth(new Date())
  const events = sessions.map(session => ({
    title: `${session.project.client.nom} - ${session.project.nom}`,
    start: new Date(session.date),
    end: new Date(new Date(session.date).getTime() + 60*60*1000), // Assume 1 hour sessions
    resource: session
  }))

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <Suspense fallback={<div>Chargement du calendrier...</div>}>
        <Calendrier events={events} />
      </Suspense>
    </div>
  )
}

