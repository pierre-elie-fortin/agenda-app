import { getNewClientsPerMonth, getSessionsPerMonth } from '../actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatChart } from "@/components/StatChart"
export default async function StatistiquesPage() {
    const currentYear = new Date().getFullYear()
    const newClients = await getNewClientsPerMonth(currentYear)
    const sessions = await getSessionsPerMonth(currentYear)

    const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']

    const clientData = monthNames.map((month, index) => ({
        name: month,
        total: newClients.find(c => c.month === index)?.count || 0
    }))

    const sessionData = monthNames.map((month, index) => ({
        name: month,
        total: sessions.find(s => s.month === index)?.count || 0
    }))

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Statistiques</h1>
            <Tabs defaultValue="clients" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="clients">Nouveaux Clients</TabsTrigger>
                    <TabsTrigger value="sessions">Sessions</TabsTrigger>
                </TabsList>
                <TabsContent value="clients">
                    <Card>
                        <CardHeader>
                            <CardTitle>Nouveaux Clients par Mois</CardTitle>
                            <CardDescription>Nombre de nouveaux clients acquis chaque mois en {currentYear}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <CardContent className="pt-6">
                                <StatChart data={clientData} color="hsl(var(--chart-1))" />
                            </CardContent>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="sessions">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sessions par Mois</CardTitle>
                            <CardDescription>Nombre de sessions réalisées chaque mois en {currentYear}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <StatChart data={sessionData} color="hsl(var(--chart-2))" />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

