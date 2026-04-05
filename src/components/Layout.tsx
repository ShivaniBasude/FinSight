import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout( {children} : {children : React.ReactNode}) {
    return (
        <div className="app-container">
            <Sidebar />

            <div className="main">
                <Navbar />

                <div className="content">{children}</div>
            </div>
        </div>
    );
}