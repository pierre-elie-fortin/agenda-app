'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { CalendarDays, Users, BarChart2, LogOut, LogIn, UserPlus, User, CreditCard } from 'lucide-react'

export function Navigation() {
    const { data: session } = useSession()

    return (
        <nav className="bg-gray-100 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">Gestion d&apos;Agenda</Link>
                <div className="flex space-x-2 md:space-x-4">
                    {session ? (
                        <>
                            <Button asChild variant="ghost" size="icon" className="md:hidden">
                                <Link href="/dashboard"><CalendarDays className="h-5 w-5" /></Link>
                            </Button>
                            <Button asChild variant="ghost" className="hidden md:inline-flex">
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>

                            <Button asChild variant="ghost" size="icon" className="md:hidden">
                                <Link href="/clients"><Users className="h-5 w-5" /></Link>
                            </Button>
                            <Button asChild variant="ghost" className="hidden md:inline-flex">
                                <Link href="/clients">Clients</Link>
                            </Button>
                            <Button asChild variant="ghost" size="icon" className="md:hidden">
                                <Link href="/statistiques"><BarChart2 className="h-5 w-5" /></Link>
                            </Button>
                            <Button asChild variant="ghost" className="hidden md:inline-flex">
                                <Link href="/statistiques">Statistiques</Link>
                            </Button>

                            <Button asChild variant="ghost" size="icon" className="md:hidden">
                                <Link href="/profil"><User className="h-5 w-5" /></Link>
                            </Button>
                            <Button asChild variant="ghost" className="hidden md:inline-flex">
                                <Link href="/profil">Profil</Link>
                            </Button>

                            <Button asChild variant="ghost" size="icon" className="md:hidden">
                                <Link href="/tarification"><CreditCard className="h-5 w-5" /></Link>
                            </Button>
                            <Button asChild variant="ghost" className="hidden md:inline-flex">
                                <Link href="/tarification">Tarification</Link>
                            </Button>

                            <Button onClick={() => signOut()} variant="ghost" size="icon" className="md:hidden">
                                <LogOut className="h-5 w-5" />
                            </Button>
                            <Button onClick={() => signOut()} variant="ghost" className="hidden md:inline-flex">
                                Déconnexion
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button asChild variant="ghost" size="icon" className="md:hidden">
                                <Link href="/login"><LogIn className="h-5 w-5" /></Link>
                            </Button>
                            <Button asChild variant="ghost" className="hidden md:inline-flex">
                                <Link href="/login">Connexion</Link>
                            </Button>

                            <Button asChild size="icon" className="md:hidden">
                                <Link href="/register"><UserPlus className="h-5 w-5" /></Link>
                            </Button>
                            <Button asChild className="hidden md:inline-flex">
                                <Link href="/register">Inscription</Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

