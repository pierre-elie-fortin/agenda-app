'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function GenererLien() {
  const [lien, setLien] = useState('')

  const genererLien = () => {
    const token = Math.random().toString(36).substring(2, 15)
    const nouveauLien = `${window.location.origin}/inscription/${token}`
    setLien(nouveauLien)
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Générer un lien d'inscription</h1>
      <div className="space-y-4">
        <Button onClick={genererLien}>Générer un nouveau lien</Button>
        {lien && (
          <div>
            <Label htmlFor="lien">Lien d'inscription :</Label>
            <Input id="lien" value={lien} readOnly />
          </div>
        )}
      </div>
    </div>
  )
}

