import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from 'lucide-react'

const plans = [
    {
        name: "Gratuit",
        price: "0€",
        description: "Pour les débutants",
        features: [
            "Jusqu'à 5 clients",
            "Jusqu'à 20 sessions par mois",
            "Statistiques de base",
        ],
    },
    {
        name: "Basique",
        price: "9.99€",
        description: "Pour les professionnels en croissance",
        features: [
            "Jusqu'à 50 clients",
            "Sessions illimitées",
            "Statistiques avancées",
            "Support par email",
        ],
    },
    {
        name: "Pro",
        price: "19.99€",
        description: "Pour les professionnels établis",
        features: [
            "Clients illimités",
            "Sessions illimitées",
            "Statistiques avancées",
            "Support prioritaire",
            "Personnalisation avancée",
        ],
    },
]

export default function TarificationPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Nos Plans</h1>
            <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <Card key={plan.name} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-3xl font-bold mb-4">{plan.price}</p>
                            <ul className="space-y-2">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                        <Check className="mr-2 h-4 w-4 text-green-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Choisir ce plan</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

