'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getClient, updateClient, addSession, deleteSession } from '@/app/actions'

export default function EditClientPage({ params }: { params: { id: string } }) {
  const [client, setClient] = useState<any>(null)
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [newSessionDate, setNewSessionDate] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchClient = async () => {
      const fetchedClient = await getClient(params.id)
      setClient(fetchedClient)
      setNom(fetchedClient.nom)
      setEmail(fetchedClient.email)
      setTelephone(fetchedClient.telephone)
    }
    fetchClient()
  }, [params.id])

  const handleUpdateClient = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateClient(params.id, { nom, email, telephone })
    router.push(`/clients/${params.id}`)
  }

  const handleAddSession = async (e: React.FormEvent) => {
    e.preventDefault()
    await addSession(params.id, new Date(newSessionDate))
    setNewSessionDate('')
    const updatedClient = await getClient(params.id)
    setClient(updatedClient)
  }

  const handleDeleteSession = async (sessionId: string) => {
    await deleteSession(sessionId)
    const updatedClient = await getClient(params.id)
    setClient(updatedClient)
  }

  if (!client) {
    return <div>Chargement...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Modifier le client: {client.nom}</h1>
      
      <form onSubmit={handleUpdateClient} className="space-y-4 mb-8">
        <div>
          <Label htmlFor="nom">Nom</Label>
          <Input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="telephone">Téléphone</Label>
          <Input id="telephone" type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
        </div>
        <Button type="submit">Mettre à jour le client</Button>
      </form>

      <h2 className="text-2xl font-bold mt-6 mb-2">Sessions</h2>
      <ul className="space-y-2 mb-4">
        {client.sessions.map((session: any) => (
          <li key={session.id} className="flex justify-between items-center border p-2 rounded">
            <span>{new Date(session.date).toLocaleString()}</span>
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

