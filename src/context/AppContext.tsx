import React, {createContext, useContext, useState} from 'react';
import { type Transaction } from '../types/transaction';
import { useEffect } from "react";
import { type Goal} from '../types/goal';

type Role = "admin" | "viewer";
type Theme = "dark" | "light";

interface AppContextType {
    transactions : Transaction[];
    role : Role;
    addTransaction: ( t: Transaction) => void;
    deleteTransaction: (id: string) => void;
    UpdateTransaction: (t: Transaction) => void;
    setRole: (r : Role) => void;
    mode : Theme;
    setMode : (value: Theme) => void;
    goals: Goal[];
    setGoals: (goals: Goal[]) => void,
    addGoal : (g: Goal) => void,
    addSavings: (id: string, s: number) =>void;
    deleteGoal : (id: string) => void;

}

const AppContext = createContext<AppContextType | undefined>(undefined);


export const AppProvider = ({children} : {children : React.ReactNode}) => {
    const [transactions, setTransactions] = useState<Transaction[]>( () => {
        const stored = localStorage.getItem("transactions");
        return stored ? JSON.parse(stored) : [];
    });

    const [role, setRole] =  useState<Role>("viewer");

    const addTransaction =  ( t: Transaction) => {
        setTransactions(prev => [...prev, t]);
    };

    const deleteTransaction =  (id: string) => {
        setTransactions( (prev) => prev.filter( t => t.id !== id));

    }

    const UpdateTransaction =  (updated: Transaction) => {

        setTransactions( prev => prev.map( t => t.id === updated.id ? updated : t));
    }

    const [mode, setMode] = useState<Theme>("light");


    useEffect( () => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    useEffect( () => {
        localStorage.setItem("theme", mode==="dark" ? "dark" : "light")

        if(mode==="dark"){
            document.body.classList.add("dark");
        }else{
            document.body.classList.remove("dark")
        }
    }, [mode]);

    const [ goals, setGoals] = useState<Goal[]>(() => {
        const stored = localStorage.getItem("goals");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect( () => {
        localStorage.setItem("goals", JSON.stringify(goals));
    }, [goals]);
    
    const addGoal = (g: Goal ) => {
        setGoals( prev => [...prev, g]);
    };

    const addSavings = (id: string, amount: number) => {
        setGoals(prev => prev.map( g => g.id===id ? {...g, saved: g.saved+amount} : g));
    };

    const deleteGoal = (id: string) => {
        setGoals(prev => prev.filter( g => g.id !== id));
    }

  
    return (
        <AppContext.Provider value={ {transactions, role, addTransaction , setRole, deleteTransaction, UpdateTransaction, mode, setMode, goals, setGoals, addGoal, addSavings, deleteGoal}}>{children}</AppContext.Provider>
    );
};

export const UseApp = () => {
    const context = useContext(AppContext);
    if(!context) throw new Error("UseApp must be used within AppProvider"); 
    return context;
};