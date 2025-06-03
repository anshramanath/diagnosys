import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

type FluEntry = {
  weekLabel: string
  iliCases: number
}

export default function FluLineChart({ data }: { data: FluEntry[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="weekLabel" stroke="#666" />
        <YAxis
          tickFormatter={(v) => `${v.toLocaleString()}`}
          stroke="#666"
        />
        <Tooltip
          contentStyle={{ backgroundColor: "#fff", borderColor: "#ccc" }}
          formatter={(value: number | string) =>
            `${Number(value).toLocaleString()} cases`
          }
        />
        <Line
          type="monotone"
          dataKey="iliCases"
          stroke="#1976d2"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}