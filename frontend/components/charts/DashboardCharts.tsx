'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import type { Prediction } from '@/types'

interface Props {
  predictions: Prediction[]
  cropFreq: Record<string, number>
}

const EARTH_COLORS = ['#1a6b3c', '#c8965c', '#2d8f5e', '#8b4513', '#d4a853', '#0f3d1f'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md border border-stone-200/60 shadow-lg rounded-xl p-3">
        {label && <p className="text-[#1a1a1a] font-bold text-sm mb-1">{label}</p>}
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-medium flex items-center gap-2 text-[#1a1a1a]">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.payload?.fill || entry.fill }} />
            <span className="capitalize">{entry.name}</span>: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardCharts({ predictions, cropFreq }: Props) {
  const barData = Object.entries(cropFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      count
    }))

  const pieData = Object.entries(cropFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value
    }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="premium-card p-6">
        <h3 className="text-[#1a1a1a] font-bold mb-6">Prediction Frequency</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="name"
              tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(26,107,60,0.05)' }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={EARTH_COLORS[index % EARTH_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="premium-card p-6">
        <h3 className="text-[#1a1a1a] font-bold mb-6">Crop Distribution</h3>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={50}
              dataKey="value"
              strokeWidth={0}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={EARTH_COLORS[index % EARTH_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => <span className="text-[#6b7280] text-xs font-semibold uppercase tracking-wider">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
