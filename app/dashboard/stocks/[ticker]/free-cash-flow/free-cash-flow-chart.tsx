'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

export interface FreeCashFlowPoint {
  year: string
  freeCashFlow: number
  freeCashFlowDisplay: string
}

const chartConfig = {
  freeCashFlow: {
    label: 'Free Cash Flow',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

function compactMoney(value: number): string {
  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''
  if (abs >= 1e12) return `${sign}$${(abs / 1e12).toFixed(1)}T`
  if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(1)}B`
  if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(1)}M`
  return `${sign}$${abs.toLocaleString()}`
}

export function FreeCashFlowChart({ data }: { data: FreeCashFlowPoint[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-[360px] w-full aspect-auto">
      <BarChart accessibilityLayer data={data} margin={{ top: 12, right: 16, bottom: 8, left: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={10}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={72}
          tickFormatter={(value) => compactMoney(Number(value))}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel={false}
              formatter={(value) => (
                <span className="font-mono font-medium tabular-nums">
                  {compactMoney(Number(value))}
                </span>
              )}
            />
          }
        />
        <ReferenceLine y={0} stroke="var(--border)" />
        <Bar
          dataKey="freeCashFlow"
          name="Free Cash Flow"
          radius={[4, 4, 0, 0]}
          fill="var(--color-freeCashFlow)"
        />
      </BarChart>
    </ChartContainer>
  )
}
