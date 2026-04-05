import React, { useState } from "react";
import { UseApp } from "../context/AppContext";
import TransactionForm from "../components/TransactionForm";
import { type TransactionType } from "../types/transaction";

export default function Transactions() {
    const [search, setSearch] = useState("");
    const [filterType, setFilterType ] = useState("All");
    const [sortBy, setSortBy ] = useState("date");
    const { mode, transactions , role, deleteTransaction, UpdateTransaction} = UseApp();
    const [ editingId, setEditingId] = React.useState<string | null>(null);
    const [ editData, setEditData ] = useState ({
        date: "",
        amount: "",
        category: "",
        type: "expense" as "expense" | "income",
    });

    const handleEdit = (t : any) => {
        setEditingId(t.id);
        setEditData({
            date: t.date,
            amount: t.amount,
            category: t.category,
            type: t.type,
        });
    };

    const handleSave = () => {
        if(!editingId) return ;

        UpdateTransaction ({
            id: editingId,
            date: editData.date,
            amount: Number(editData.amount),
            category: editData.category,
            type: editData.type as "income" | "expense",
        });
        setEditingId(null);
    };

    const filterTransactions = transactions.filter( t => {
        return (
            t.category.toLocaleLowerCase().includes(search.toLowerCase()) || t.type.toLowerCase().includes(search.toLowerCase() )
        );
    })
    .filter ( t => {
        if( filterType === "All" ) return true;
            return t.type === filterType;
    })
    .sort ( (a,b) => {
        if( sortBy === "amount") return b.amount - a.amount;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    const exportCSV = () => {
        if(transactions.length === 0) return ;

        const headers = ["Date", "Amount", "CAtegory", "Type"];

        const rows = transactions.map ( t => [
            t.date,
            t.amount,
            t.category,
            t.type
        ]);

        const csvContent = [headers, ...rows]
        .map( row => row.join(","))
        .join("\n");

        const blob = new Blob([csvContent], {type : "text/csv"});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "transactions.csv";
        a.click();

        window.URL.revokeObjectURL(url);
    }

    const capitalize = (str : TransactionType) => {
        if(!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    }



    return (
        <div>
            <h2>Transactions</h2>

            <div className="filters">
                <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />

                <select onChange={e => setFilterType(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>

                <select onChange={e => setSortBy(e.target.value)}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
            </div>

            { role==="admin" && <TransactionForm /> }

            <table>
                <thead>
                    <tr className={mode === "dark" ? "dark" : "light"}>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Type</th>
                        { role === "admin" && <th>Actions</th> }
                    </tr>
                </thead>

                {filterTransactions.length === 0 && (
                <div className="empty-state">
                    <p>No transactions yet.</p>
                </div>
            )}

                <tbody>
                    {filterTransactions.map( (t) => (
                        <tr key = {t.id}>
                            {editingId === t.id ? (
                                <>
                                <td><input type="date" className="edit" value={editData.date} onChange={(e) => setEditData({...editData, date: e.target.value})} /></td>
                                <td><input type="text" className="edit" value={editData.amount} onChange={(e) => setEditData({...editData, amount: e.target.value})} /></td>
                                <td><input type="text" className="edit" value={editData.category} onChange={(e) => setEditData({...editData, category: e.target.value})} /></td>
                                <td>
                                    <select value={editData.type} className="edit" onChange={(e) => setEditData({...editData, type: e.target.value as "income" | "expense"})}>
                                    <option value="expense">Expense</option>
                                    <option value="income">Income</option>
                                </select>
                                </td>
                                <td><button onClick={handleSave} className="save-btn">Save</button></td>
                                </>
                            ) : (
                                <>
                                 <td>{t.date}</td>
                                <td className={t.type === "income" ? "income" : "expense"}>${t.amount}</td>
                                <td>{t.category}</td>
                                <td><span className={`${t.type}`}>{capitalize(t.type)}</span></td>

                                <td>
                                    {role==="admin" && (
                                        <>
                                        <button onClick={() => handleEdit(t)} className="edit-btn">Edit</button>
                                        <button  className="delete-btn" onClick={() => {
                                            if(window.confirm("Delete this transaction record?")){
                                                deleteTransaction(t.id);
                                            }
                                        }}
                                        >Delete</button>
                                        </>
                                    )}
                                </td>
                                </>
                            )}
                           
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="export-btn" onClick={exportCSV}>Export CSV</button>
        </div>
    );
};