import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function InscriptionReussie() {
  return (
    <div className="container mx-auto p-4 max-w-md text-center">
      <h1 className="text-2xl font-bold mb-4">Inscription réussie !</h1>
      <p className="mb-4">Merci de vous être inscrit. Votre compte a été créé avec succès.</p>
      <Button asChild>
          <Link href="/">Retour à l&apos;accueil</Link>
      </Button>
    </div>
  )
}

