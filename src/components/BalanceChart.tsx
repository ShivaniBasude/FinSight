import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { UseApp } from "../context/AppContext";
import { useState } from "react";

export default function BalanceChart() {
    const { transactions } = UseApp();
    const [view, setView] = useState<"daily" | "monthly">("daily");

    const sorted = [...transactions].sort(
        (a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let monthlyBalance = 0;
    let runningBalance = 0;

    const dailyData = sorted.map( t => {
        runningBalance += t.type === "income" ? t.amount : -t.amount;

        return{
            date: new Date(t.date).toLocaleDateString(),
            balance: runningBalance,
        };
    });

    const monthMap : Record<string, number> = {};

    sorted.forEach( t => {
        const month = new Date(t.date).toLocaleString("default", {month: "short",});

        if(!monthMap[month]) monthMap[month] = 0;

        monthMap[month] += t.type === "income" ? t.amount : -t.amount;
    });

    const monthlyData = Object.keys(monthMap).map( month => {
        monthlyBalance += monthMap[month];

        return {
            date : month,
            balance : monthlyBalance,
        };
    });

    const data = view==="daily" ? dailyData : monthlyData;

    if(!data || data.length === 0) {
        return <div className="empty">No data to display</div>;
    }

    const isNeg = data[data.length -1]?.balance < 0;
    return (
              
        <ResponsiveContainer width="100%" height={300}>
            <div className="data-view">
               <button className={`data-btns ${view=="daily" ? "active" : ""}`} onClick={() => setView("daily")}>Daily</button>
                <button className={`data-btns ${view=="monthly" ? "active" : ""}`} onClick={() => setView("monthly")}>Monthly</button>
            </div>
            <AreaChart data={data}>
                 <defs>
                     <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFF7D1" stopOpacity={0.8} />
                     <stop offset="95%" stopColor="#FFF7D1" stopOpacity={0} />
                    </linearGradient>
                 </defs>

                <CartesianGrid stroke="#FFF1F1" />

                <XAxis dataKey="date" />

                <YAxis domain={["auto", "auto"]} />

                <Tooltip formatter={(v) => `₹${v}`} />

                <Area
                    type="monotone"
                    dataKey="balance"
                    stroke={isNeg ? "#dc2626" : "#16a34a"}
                    fill="url(#colorBalance)"
                    strokeWidth={3}
                />
            </AreaChart>
        </ResponsiveContainer>
       
    );
};