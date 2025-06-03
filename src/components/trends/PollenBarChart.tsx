import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts"

const LEVELS = ['None', 'Low', 'Moderate', 'High', 'Extreme']
const VISIBLE_TICKS = [0, 1, 2, 3, 4]

// Define the shape of each data entry
type PollenEntry = {
  date: string
  tree: number
  grass: number
  pine: number
}

export default function PollenBarChart({ data }: { data: PollenEntry[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 10, right: 20, bottom: 20, left: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="date" stroke="#666" />
        <YAxis
          domain={[0, 4]}
          ticks={VISIBLE_TICKS}
          tickFormatter={(val) => LEVELS[val]}
          stroke="#666"
        />
        <Tooltip
          contentStyle={{ backgroundColor: "#fff", borderColor: "#ccc" }}
          formatter={(value: number) => LEVELS[value]}
        />
        <Legend />
        <Bar dataKey="tree" fill="#66bb6a" name="Tree" />
        <Bar dataKey="grass" fill="#42a5f5" name="Grass" />
        <Bar dataKey="pine" fill="#8d6e63" name="Pine" />
      </BarChart>
    </ResponsiveContainer>
  )
}