import { useState } from 'react';
import { UseApp } from '../context/AppContext';

export default function TransactionForm() {
    const { addTransaction } = UseApp();

    const [formData, setFormData] = useState({ 
        date: "",
        amount: "",
        category: "",
        type: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e : React.FormEvent ) => {
        e.preventDefault();

        if(!formData.amount || !formData.category || !formData.date) {
            alert("Please fill all fields");
            return ;
        }

        addTransaction({
            id: Date.now().toString(),
            date: formData.date,
            amount: Number(formData.amount),
            category: formData.category,
            type: formData.type as "income" | "expense"
        });

        setFormData({
            date: "",
            amount: "",
            category: "",
            type: "",
        });
    };

    return(
        <form onSubmit={handleSubmit} className='form'>
            <input type="date" placeholder="DD-MM-YYYY" name="date" value={formData.date} onChange={handleChange} />

            <input type="text" name="amount" placeholder='Amount' value={formData.amount} onChange={handleChange} />

            <input type="text" name="category" placeholder='Category(Food, rent, Transport,...' value={formData.category} onChange={handleChange} />

            <select name="type" value={formData.type} onChange={handleChange}>
                <option value="">Select Type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>

            <button className="add-btn" type="submit">Add Transaction</button>
        </form>
    );
}