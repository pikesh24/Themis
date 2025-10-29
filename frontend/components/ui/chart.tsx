"use client"

import * as React from "react"
import {
  BarChart as BarChartPrimitive,
  ResponsiveContainer as ResponsiveContainerPrimitive,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  type TooltipProps,
  type BarProps,
} from "recharts"

import { cn } from "../../lib/utils"

// Chart Container
interface ChartData {
  name: string;
  [key: string]: string | number;
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ChartData[]
  xAxis?: string[]
  yAxis?: number[]
  children: React.ReactNode
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ className, data, xAxis, yAxis, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("w-full h-full", className)} {...props}>
        <ResponsiveContainerPrimitive width="100%" height="100%">
          {React.cloneElement(React.Children.only(children), { data })}
        </ResponsiveContainerPrimitive>
      </div>
    )
  },
)
ChartContainer.displayName = "ChartContainer"

// Bar Chart
interface BarChartProps extends Omit<BarProps, "ref"> {
  dataKey: string
  fill?: string
  radius?: number
}

const BarChart = React.forwardRef<SVGElement, BarChartProps>(
  ({ dataKey, fill = "#3b82f6", radius = 0, ...props }, ref) => {
    return (
      <BarChartPrimitive {...props}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip
          cursor={{ fill: "#f3f4f6", opacity: 0.2 }}
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        />
        <BarChartPrimitive.Bar dataKey={dataKey} fill={fill} radius={radius} {...props} />
      </BarChartPrimitive>
    )
  },
)
BarChart.displayName = "BarChart"

// Chart Tooltip
interface ChartTooltipProps {
  content?: React.FC<TooltipProps<number | string, string>>
}

const ChartTooltip = ({ content }: ChartTooltipProps) => {
  return <Tooltip content={content} />
}

// Chart Tooltip Content
interface ChartTooltipContentProps {
  title?: string
  items: {
    label: string
    value: string | number
    color?: string
  }[]
}

const ChartTooltipContent = ({ title, items }: ChartTooltipContentProps) => {
  return (
    <div className="rounded-lg border bg-background p-2 shadow-md">
      {title && <div className="mb-1 font-medium">{title}</div>}
      <div className="flex flex-col gap-1">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {item.color && <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />}
            <span className="text-sm text-muted-foreground">{item.label}:</span>
            <span className="text-sm font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export { ChartContainer, BarChart, ChartTooltip, ChartTooltipContent }

