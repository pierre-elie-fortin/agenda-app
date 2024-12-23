import { Suspense } from 'react'
import Calendrier from '@/components/Calendrier'
import { getSessionsForMonth, getSessionsForDay } from '../actions'

export default async function Dashboard() {
  const sessions = await getSessionsForMonth(new Date())
    const today = new Date();
  const todaySessions = await getSessionsForDay(today)
    const events = sessions.map(session => ({
        title: `${session.project?.client.nom || 'Unknown Client'} - ${session.project?.nom || 'Unknown Project'}`,
        start: new Date(session.date ?? Date.now()), // Use current date as fallback
        end: new Date((session.date ? new Date(session.date).getTime() : Date.now()) + 60 * 60 * 1000), // 1-hour session
        resource: session
    }));

  return (
      <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <Suspense fallback={<div>Chargement du calendrier...</div>}>
              <Calendrier events={events}/>
          </Suspense>
          <div className="mt-6">
              <h2 className="text-2xl font-bold">
                  Sessions d&apos;aujourd&apos;hui ({new Intl.DateTimeFormat('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
              }).format(new Date())})
              </h2>
              {todaySessions.length > 0 ? (
                  <ul className="list-disc list-inside mt-4">
                      {todaySessions.map((session) => (
                          <li key={session.id}>
                              {session.project?.client.nom} - {session.project?.nom}
                          </li>
                      ))}
                  </ul>
              ) : (
                  <p className="mt-4">Aucune session prévue pour aujourd&apos;hui.</p>
              )}
          </div>
      </div>
  )
}

