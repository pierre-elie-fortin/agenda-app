'use client'

import React, {useState, useEffect, use} from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getClient, updateClient } from '@/app/actions'
import Link from "next/link"
export default function EditClientPage({ params }: { params: { id: string } }) {
  const [client, setClient] = useState(null)
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const router = useRouter()
  const useParams = use(params)

  useEffect(() => {
    if (!params) return
    const fetchClient = async () => {
      const fetchedClient = await getClient(useParams.id)
      setClient(fetchedClient)
      setNom(fetchedClient.nom)
      setEmail(fetchedClient.email)
      setTelephone(fetchedClient.telephone)
    }
    fetchClient()
  }, [params])

  const handleUpdateClient = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateClient(useParams.id, { nom, email, telephone })
    router.push(`/clients/${useParams.id}`)
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

        <h2 className="text-2xl font-bold mt-6 mb-2">Projets</h2>
        <ul className="space-y-2 mb-4">
          {client.projects.map((project) => (
              <li key={project.id} className="flex justify-between items-center border p-2 rounded">
                <Link href={`/projects/${project.id}`} className="text-blue-500 hover:underline">
                  {project.nom}
                </Link>
              </li>
          ))}
        </ul>
      </div>
  )
}
