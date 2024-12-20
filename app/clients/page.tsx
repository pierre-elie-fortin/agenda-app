import Link from 'next/link'
import { getClients } from '../actions'
import { Button } from '@/components/ui/button'

export default async function ClientsList() {
  const clients = await getClients()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Liste des Clients</h1>
      {clients.length === 0 ? (
        <p>Vous n'avez pas encore de clients.</p>
      ) : (
        <ul className="space-y-4">
          {clients.map((client) => (
            <li key={client.id} className="border p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{client.nom}</h2>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/clients/${client.id}`}>Voir détails</Link>
                </Button>
              </div>
              <p className="text-gray-600">{client.email}</p>
              <p className="text-gray-600">{client.telephone}</p>
              <h3 className="text-lg font-semibold mt-2">Projets :</h3>
              <ul className="list-disc list-inside">
                {client.projects.map((project: any) => (
                  <li key={project.id}>
                    <Link href={`/projects/${project.id}`} className="text-blue-500 hover:underline">
                      {project.nom}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
      <Button asChild className="mt-4">
        <Link href="/generate-link">Ajouter un client</Link>
      </Button>
    </div>
  )
}

