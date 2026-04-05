import { Link, useLocation } from "react-router-dom";

export default function Sidebar () {
    const location = useLocation();
    return (
        <div className="sidebar">
            <h3>Menu</h3>

            <ul>
                <li className={location.pathname === "/" ? "active" : ""}>
                    <Link to="/">Dashboard</Link>
                </li>

                <li className={location.pathname === "/transactions" ? "active" : ""}>
                    <Link to="/transactions">Transactions</Link>
                </li>
                <li className={location.pathname === "/insights" ? "active" : ""}>
                    <Link to="/insights">Insights</Link>
                </li>
            </ul>
        </div>
    );
}