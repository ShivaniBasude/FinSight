import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { UseApp } from "../context/AppContext";

export default function MonthlyBarChart () {
    const { transactions } = UseApp();
    const months = ["Jan", "Feb","Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const monthMap: Record<string, number> = {};

    months.forEach( m => {
        monthMap[m] = 0;
    });

    transactions.forEach( t => {
        const month = new Date(t.date).toLocaleString("default", { month: "short"});
        if(t.type === "expense") {
            monthMap[month] = (monthMap[month] || 0) + t.amount;
        }
    });

    const data = months.map( month => ({
        month,
        amount: monthMap[month],
    }));

    if(data.length === 0) return <p className="empty"> No Data. </p>

    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid stroke="#FFF1F1" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, "auto"]} />
                    <Tooltip formatter={(value) => `$${value}`}/>
                    <Bar dataKey="amount" maxBarSize={40} fill="#6A42C2" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}