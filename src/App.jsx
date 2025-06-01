import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

const data = [
  { name: "PvP Players", value: 30 },
  { name: "PvE Players", value: 25 },
  { name: "F2P Grinders", value: 20 },
  { name: "Whales", value: 15 },
  { name: "Guild Players", value: 10 },
];

const actions = {
  "PvP Players": [
    { action: "Launch PvP Tournament", cost: 10000, effect: 10 },
    { action: "Leaderboard Rewards", cost: 5000, effect: 5 },
  ],
  "PvE Players": [
    { action: "Building Marathon", cost: 7000, effect: 7 },
    { action: "New PvE Campaign", cost: 15000, effect: 15 },
  ],
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

export default function App() {
  const [selectedPersona, setSelectedPersona] = useState(null);

  const calculateSummary = (persona) => {
    const personaActions = actions[persona] || [];
    const totalCost = personaActions.reduce((sum, item) => sum + item.cost, 0);
    const totalEffect = personaActions.reduce((sum, item) => sum + item.effect, 0);
    const roi = totalEffect * 2000 - totalCost;
    return { totalCost, totalEffect, roi };
  };

  const summary = selectedPersona ? calculateSummary(selectedPersona) : null;

  return (
    <div className="p-6 grid gap-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Upload Player Data (CSV)</h2>
          <Button variant="outline">Upload CSV</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Player Segmentation</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
                onClick={(e) => setSelectedPersona(e.name)}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {selectedPersona && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Recommended Actions for {selectedPersona}</h2>
            <ul className="list-disc list-inside">
              {actions[selectedPersona]?.map((item, index) => (
                <li key={index} className="mb-2">
                  <strong>{item.action}</strong> — Cost: ${item.cost} — Expected Effect: +{item.effect}% Retention
                </li>
              ))}
            </ul>
            {summary && (
              <div className="mt-4">
                <p><strong>Total Cost:</strong> ${summary.totalCost}</p>
                <p><strong>Total Expected Retention Increase:</strong> +{summary.totalEffect}%</p>
                <p><strong>Estimated ROI:</strong> ${summary.roi}</p>
              </div>
            )}
            <Button variant="default" className="mt-4">Download Report</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
