import {useState} from "react";
import { UseApp } from "../context/AppContext";

export default function Goal () {
    const { role, goals, addGoal, addSavings, deleteGoal} = UseApp();

    const [title, setTitle] = useState("");
    const [target, setTarget] = useState(0);

    const handleAdd = () => {
        if(!title || target<=0) return;

        addGoal ({
            id: Date.now().toString(),
            title,
            target,
            saved: 0,
        });

        setTitle("");
        setTarget(0);
    };

    

    return (
        <div className="chart-container">
            <h2>Savings Goal</h2>

            {role === "admin" && (<div className="form">
                <input placeholder="Goal name" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <input type="text" placeholder="Target" value={target} onChange={e => setTarget(Number(e.target.value))}/>
                <button className="add-btn" onClick={handleAdd}>Add Goal</button>
            </div>
            )}

            <div className="goal-grid">

                <div className={`goals-row header {mode==="dark" ? "dark" : "light"}`}>
                    <div>Goal</div>
                    <div>Target</div>
                    <div>Saved</div>
                    <div>Progress</div>
                    {role==="admin" && (<div>Actions</div>)}
                </div>
                {goals.map( g => {
                    const percent = Math.min( (g.saved / g.target) * 100 , 100);
                    return (
                        <div key={g.id} className="goals-row">
                            <div>{g.title}</div>
                            <div>${g.target}</div>
                            <div>${g.saved}</div>

                            <div>
                                <div className="progress-bar">
                                <div className="progress-fill" style={{width: `${percent}%`,background:percent > 70 ? "#16a34a" :percent > 40 ? "#8B5DFF" :"#6A42C2"}}></div>
                            </div>

                            <p>{Math.round(percent)}%</p>
                            </div>

                            <div>
                                {role ==="admin" && (<button className="edit-btn" onClick={() => {
                                const amount = Number(prompt("Add amount"));
                                if(amount > 0) addSavings(g.id, amount);
                            }}> Add Money</button>
                        )}

                            {role ==="admin" && (<button className="delete-btn" onClick={() => deleteGoal(g.id)}>Delete</button>)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}