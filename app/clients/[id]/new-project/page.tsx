'use client'

import {use, useState} from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { addProject } from '@/app/actions'
interface ParamsI {
  id: string;
}
export default function NewProjectPage({ params }) {
  const [nom, setNom] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()
  const useParams = use(params) as ParamsI

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await addProject(useParams.id, { nom, description })
    router.push(`/clients/${useParams.id}`)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Nouveau Projet</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="nom">Nom du projet</Label>
          <Input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <Button type="submit">Créer le projet</Button>
      </form>
    </div>
  )
}

