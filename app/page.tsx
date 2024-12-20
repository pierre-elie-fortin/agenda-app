import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur Gestion d'Agenda</h1>
      {session ? (
        <p>Connecté en tant que {session.user?.name || session.user?.email}</p>
      ) : (
        <p>Veuillez vous connecter pour accéder à votre agenda.</p>
      )}
    </div>
  )
}

