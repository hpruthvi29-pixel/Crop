'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import type { Prediction } from '@/types'
import { getCropById } from '@/data/crops'

interface Props {
  predictions: Prediction[]
  cropFreq: Record<string, number>
}

const getCropColor = (cropName: string): string => {
  const crop = getCropById(cropName)
  return crop?.color || '#22c55e'
}

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

  const customTooltipStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid rgba(112, 122, 108, 0.2)',
    borderRadius: '12px',
    color: '#071e27',
    fontSize: '13px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="bg-white rounded-2xl border border-outline-variant/40 shadow-sm p-6">
        <h3 className="text-on-surface font-bold mb-6">Prediction Frequency</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="name"
              tick={{ fill: '#40493d', fontSize: 11, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#40493d', fontSize: 11, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={customTooltipStyle}
              cursor={{ fill: 'rgba(13,99,27,0.03)' }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getCropColor(entry.name)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-2xl border border-outline-variant/40 shadow-sm p-6">
        <h3 className="text-on-surface font-bold mb-6">Crop Distribution</h3>
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
                <Cell key={`cell-${index}`} fill={getCropColor(entry.name)} />
              ))}
            </Pie>
            <Tooltip contentStyle={customTooltipStyle} />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => <span style={{ color: '#071e27', fontSize: '12px', fontWeight: 500 }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
