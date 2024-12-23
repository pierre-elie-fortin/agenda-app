'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

interface StatChartProps {
    data: Array<{ name: string; total: number }>
    color?: string
    height?: number
}

export function StatChart({ data, color = "hsl(var(--chart-1))", height = 350 }: StatChartProps) {
    return (
        <ChartContainer config={{
            total: {
                label: "Total",
                color: color,
            },
        }}>
            <ResponsiveContainer width="100%" height={height}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltipContent />
                    <Bar dataKey="total" fill={color} />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}
