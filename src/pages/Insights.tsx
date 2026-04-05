import { UseApp } from "../context/AppContext";
import MonthlyBarChart from "../components/MonthlyBarChart";
import SpendingChart from "../components/SpendingChart";

const Insights = () => {
  const { transactions } = UseApp();

  const categoryMap: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });


  const now = new Date();
  const currMonth = now.getMonth();
  const lastmonth = currMonth - 1;

  let curMonthTotal = 0;
  let lastMonthTotal = 0;

  transactions.forEach( t => {
    const month = new Date(t.date).getMonth();

    if(t.type === "expense"){
      if (month === currMonth) curMonthTotal += t.amount;
      if(month === lastmonth ) lastMonthTotal += t.amount;
    }
  });

  return (
    <div>
      <h2>Insights</h2>
      <div className="insights-grid">


        <div className="flip-card">
          <div className="flip-card-inner">
             <div className="flip-card-front">
              <h2>Monthly Expenditure <i className="fa-solid fa-chart-simple"></i></h2>
              <p>(Hover to analyze)</p>
             
             </div>

            <div className="flip-card-back">
              <h4>Monthly Spending</h4>
              <MonthlyBarChart />
            </div>
          </div>
        </div>

        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h2>Expenditure Category Analysis <i className="fa-solid fa-chart-pie"></i></h2>
              <p>(Hover to analyze)</p>
              
            </div> 

            <div className="flip-card-back">
               <h4>Category Breakdown</h4>
              <SpendingChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;