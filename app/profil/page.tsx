'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { updateUserProfile } from '@/app/actions'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
    const { data: session, update } = useSession()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subscriptionPlan, setSubscriptionPlan] = useState('free')
    const router = useRouter()

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || '')
            setEmail(session.user.email || '')
            setSubscriptionPlan(session.user.subscriptionPlan || 'free')
        }
    }, [session])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const result = await updateUserProfile({ name, email })
            if (result.success) {
                await update({ name, email, subscriptionPlan })
                router.refresh() // Force a refresh of the page
                alert('Profil mis à jour avec succès')
            } else {
                throw new Error(result.error)
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil:', error)
            alert('Erreur lors de la mise à jour du profil')
        }
    }

    return (
        <div className="container mx-auto p-4">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Profil Utilisateur</CardTitle>
                    <CardDescription>Modifiez vos informations personnelles ici</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nom</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subscriptionPlan">Plan d&apos;abonnement</Label>
                            {/*<Select value={subscriptionPlan} onValueChange={setSubscriptionPlan}>*/}
                            {/*    <SelectTrigger>*/}
                            {/*        <SelectValue placeholder="Sélectionnez un plan" />*/}
                            {/*    </SelectTrigger>*/}
                            {/*    <SelectContent>*/}
                            {/*        <SelectItem value="free">Gratuit</SelectItem>*/}
                            {/*        <SelectItem value="basic">Basique</SelectItem>*/}
                            {/*        <SelectItem value="pro">Pro</SelectItem>*/}
                            {/*    </SelectContent>*/}
                            {/*</Select>*/}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Mettre à jour le profil</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

