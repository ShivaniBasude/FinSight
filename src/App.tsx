import Dashboard from "./pages/dashboard";
import Transactions from "./pages/Transactions";
import Layout from "./components/Layout";
import Insights from "./pages/Insights";
import {Routes , Route} from "react-router-dom";


function App() {
  return (
   <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
   </Layout>
  );
}

export default App;