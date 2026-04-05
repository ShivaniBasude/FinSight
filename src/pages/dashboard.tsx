import { UseApp } from "../context/AppContext";
import BalanceChart from "../components/BalanceChart";
import Goals from "../components/Goals";

export default function Dashboard() {
    const { transactions } = UseApp();

    const income = transactions
        .filter( (t) => t.type === "income")
        .reduce( (sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter( (t) => t.type === "expense")
        .reduce( (sum, t) => sum + t.amount, 0);

        const balance = income - expenses;

        return (
            <div>
                <h2>Dashboard</h2>
                <div className="cards">
                    
                    <div className="card"><h3>Balance : </h3><p>${balance}</p></div>
                    <div className="card"><h3>Income <i className="fa-solid fa-arrow-trend-up"></i>:</h3> <p>${income}</p></div>
                    <div className="card"><h3>Expenses <i className="fa-solid fa-arrow-trend-down"></i>:</h3><p> ${expenses}</p></div>
                </div>

                <div className="chart-container">
                    <div className="chart-grid">
                        <h3>Balance Trend</h3>
                        <BalanceChart />
                    </div>
                    
                </div>

                <Goals />
            </div>
        );
};