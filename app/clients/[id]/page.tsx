import Link from 'next/link'
import { getClient } from '@/app/actions'
import { Button } from '@/components/ui/button'

export default async function ClientPage({ params }: { params: { id: string } }) {
  const client = await getClient(params.id)

  if (!client) {
    return <div>Client non trouvé</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Fiche Client: {client.nom}</h1>
      <div className="mb-4">
        <p><strong>Email:</strong> {client.email}</p>
        <p><strong>Téléphone:</strong> {client.telephone}</p>
      </div>

      <h2 className="text-2xl font-bold mt-6 mb-2">Projets</h2>
      <ul className="space-y-2 mb-4">
        {client.projects.map((project: any) => (
          <li key={project.id} className="border p-2 rounded">
            <Link href={`/projects/${project.id}`} className="text-blue-500 hover:underline">
              {project.nom}
            </Link>
            <p className="text-sm text-gray-600">{project.description}</p>
          </li>
        ))}
      </ul>

      <div className="space-x-2">
        <Button asChild>
          <Link href={`/clients/${client.id}/edit`}>Modifier le client</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/clients/${client.id}/new-project`}>Nouveau projet</Link>
        </Button>
      </div>
    </div>
  )
}

