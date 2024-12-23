'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getClients } from '../actions';
import {Label} from "@/components/ui/label";

export default function ClientsList() {
    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [lien, setLien] = useState('')

    const generateLink = () => {
        const token = Math.random().toString(36).substring(2, 15)
        const nouveauLien = `${window.location.origin}/inscription/${token}`
        setLien(nouveauLien)
    }
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const fetchedClients = await getClients();
                setClients(fetchedClients);
            } catch (error) {
                console.error('Erreur lors de la récupération des clients :', error);
            }
        };
        fetchClients();
    }, []);

    const filteredClients = clients.filter(client =>
        (client.nom && client.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (client.telephone && client.telephone.includes(searchTerm))
    );



    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Générer un lien d'inscription</h1>
            <div className="space-y-4 mb-3">
                <Button onClick={generateLink}>Générer un nouveau lien</Button>
                {lien && (
                    <div>
                        <Label htmlFor="lien">Lien d'inscription :</Label>
                        <Input id="lien" value={lien} readOnly/>
                    </div>
                )}
            </div>
            <h1 className="text-3xl font-bold mb-4">Liste des Clients</h1>

            <div className="mb-4">
                <Input
                    type="text"
                    placeholder="Rechercher un client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-sm"
                />
            </div>

            {filteredClients.length === 0 ? (
                <p>Aucun client trouvé.</p>
            ) : (
                <ul className="space-y-4">
                    {filteredClients.map((client) => (
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
                                {client.projects?.map((project) => (
                                    <li key={project.id}>
                                        <Link href={`/projects/${project.id}`}
                                              className="text-blue-500 hover:underline">
                                            {project.nom}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
