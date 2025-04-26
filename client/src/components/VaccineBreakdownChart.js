import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const VaccineBreakdownChart = ({ data }) => (
  <div className="card mt-5 shadow-sm border-0 rounded-4 p-4">
    <h4 className="mb-4 text-center text-primary fw-semibold">
      <i className="bi bi-bar-chart-fill me-2"></i>Vaccination Breakdown by Type
    </h4>
    {data.length > 0 ? (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="vaccine"
            tick={{ fontSize: 13, fill: '#555' }}
            axisLine={{ stroke: '#ccc' }}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 13, fill: '#555' }}
            axisLine={{ stroke: '#ccc' }}
          />
          <Tooltip
            contentStyle={{ borderRadius: '10px', backgroundColor: '#f8f9fa', border: '1px solid #ccc' }}
            itemStyle={{ fontSize: 13 }}
            labelStyle={{ fontWeight: 'bold' }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ fontSize: 13, paddingBottom: 10 }}
          />
          <Bar
            dataKey="count"
            fill="url(#colorUv)"
            radius={[6, 6, 0, 0]}
            barSize={40}
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4caf50" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#81c784" stopOpacity={0.8} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    ) : (
      <p className="text-muted text-center">No vaccination data available</p>
    )}
  </div>
);

export default VaccineBreakdownChart;