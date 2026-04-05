import ReactDom from "react-dom/client";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import { BrowserRouter } from "react-router-dom";
import "./style.css";


const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDom.createRoot(rootElement).render(
    <BrowserRouter basename="/finsight">
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
      
  );
}