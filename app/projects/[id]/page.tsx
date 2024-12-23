'use client'

import { useState, useEffect, use } from 'react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getProject, addSession, deleteSession } from '@/app/actions'

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState(null)
  const [newSessionDate, setNewSessionDate] = useState('')
  const useParams = use(params)
  useEffect(() => {
    const fetchProject = async () => {
      const fetchedProject = await getProject(useParams.id)
      setProject(fetchedProject)
    }
    fetchProject()
  }, [useParams.id])

  const handleAddSession = async (e: React.FormEvent) => {
    e.preventDefault()
      try {
         await addSession(useParams.id, new Date(newSessionDate));
      } catch (error) {
          console.error("Failed to add session:", error);
      }
    setNewSessionDate('')
    const updatedProject = await getProject(useParams.id)
    setProject(updatedProject)
  }

  const handleDeleteSession = async (sessionId: string) => {
    await deleteSession(sessionId)
    const updatedProject = await getProject(useParams.id)
    setProject(updatedProject)
  }

  if (!project) {
    return <div>Chargement...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Projet: {project.nom}</h1>
      <p className="mb-4"><strong>Client:</strong> {project.client.nom}</p>
      <p className="mb-4">{project.description}</p>

      <h2 className="text-2xl font-bold mt-6 mb-2">Sessions</h2>
      <ul className="space-y-2 mb-4">
        {project.sessions.map((session) => (
          <li key={session.id} className="flex justify-between items-center border p-2 rounded">
            <span>{format(new Date(session.date), 'dd MMMM yyyy HH:mm', { locale: fr })}</span>
            <Button variant="destructive" onClick={() => handleDeleteSession(session.id)}>Supprimer</Button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddSession} className="space-y-4">
        <div>
          <Label htmlFor="newSession">Nouvelle session</Label>
          <Input
            id="newSession"
            type="datetime-local"
            value={newSessionDate}
            onChange={(e) => setNewSessionDate(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Ajouter une session</Button>
      </form>
    </div>
  )
}

