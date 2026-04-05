import { PieChart, Pie, Cell, Tooltip,ResponsiveContainer } from "recharts";
import { UseApp } from "../context/AppContext";

const COLORS =["#8B5DFF", "#85409D", "#FFBB28", "#FF8042", "#3B0270"];

export default function SpendingChart() {
    const { transactions } = UseApp();

    const categoryMap : Record<string, number> = {};

    transactions.forEach( t => {
        if(t.type === "expense") {
            categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
        }
    });

    const data = Object.keys(categoryMap).map( key => ({
        name: key,
        value: categoryMap[key],
    }));

    // console.log("Pie chart: ", data);

    if(data.length === 0) {
        return <p className="empty">No expenses data.</p>;
    }

    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width = "100%" height="100%" aspect={2}>
                <PieChart>
                    <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
                         {data.map( (_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))} 
                    </Pie> 
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}