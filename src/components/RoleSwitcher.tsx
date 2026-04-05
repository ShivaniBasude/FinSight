import {UseApp} from "../context/AppContext";

export default function RoleSwitcher() {
    const { role, setRole } = UseApp();

    const toggleRole = () => {
        setRole( role === "admin" ? "viewer" : "admin");
    };

    return (
        <div className="role-switch">
            <button className={`role-btn ${role==="admin" ? "active" : ""}`} onClick={toggleRole}>Admin</button>
            <button className={`role-btn ${role==="viewer" ? "active" : ""}`} onClick={toggleRole}>Viewer</button>
        </div>
        
    );
};