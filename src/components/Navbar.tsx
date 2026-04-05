import { UseApp } from "../context/AppContext";
import RoleSwitcher from "./RoleSwitcher";

export default function Navbar () {

    const { mode, setMode } = UseApp();

    return (
        <div className="navbar">
            <h3> FinSight </h3>
            
            <div className="btns-sec">
                <RoleSwitcher />

                <div className="theme-change">
                    <button className={`theme-btn ${mode==="dark" ? "dark" : ""} ${mode==="dark" ? "active" : ""}`} onClick={() => setMode(mode==="light" ?  "dark" : "light")}>🌙</button>
                    <button className={`theme-btn ${mode==="light" ? "light" : ""} ${mode==="light" ? "active" : ""}` } onClick={() => setMode(mode==="dark" ?  "light" : "dark")}>☀️</button>
                </div>
            </div>
        </div>
    );
}