"use client"

import { useTheme } from "next-themes"
import { Tooltip } from "recharts"

interface PayloadItem {
    value: number | string;
    name: string;
    [key: string]: any; // Include additional properties as needed
}

interface ChartConfig {
    total: {
        label: string;
        color: string;
    };
    [key: string]: any; // Allow additional properties if necessary
}

export function ChartContainer({ config, children }: { config: ChartConfig, children: React.ReactNode }) {
    const { theme } = useTheme();
    return (
        <div
            className="chart-container"
            style={{ "--color-primary": theme === "dark" ? "#ffffff" : "#000000" } as React.CSSProperties}
        >
            {children}
        </div>
    );
}

export function ChartTooltip({
                                 active,
                                 payload,
                                 label,
                             }: {
    active?: boolean;
    payload?: PayloadItem[]; // Array of data points
    label?: string;
}) {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
                        <span className="font-bold text-muted-foreground">{payload[0].value}</span>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}

export function ChartTooltipContent() {
    return (
        <Tooltip content={<ChartTooltip />} />
    )
}

