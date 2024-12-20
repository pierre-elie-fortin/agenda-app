'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export function Navigation() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Gestion d'Agenda</Link>
        <div className="space-x-4">
          {session ? (
            <>
              <Button asChild variant="ghost">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/clients">Clients</Link>
              </Button>
              <Button onClick={() => signOut()}>Déconnexion</Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">Connexion</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Inscription</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

