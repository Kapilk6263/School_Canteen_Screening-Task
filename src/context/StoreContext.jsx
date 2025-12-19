import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const StoreContext = createContext();

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) throw new Error('useStore must be used within a StoreProvider');
    return context;
};

export const StoreProvider = ({ children }) => {
    const [snacks, setSnacks] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadData = async () => {
        setLoading(true);
        try {
            const [snacksData, studentsData] = await Promise.all([
                api.getSnacks(),
                api.getStudents()
            ]);
            setSnacks(snacksData);
            setStudents(studentsData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const addStudent = async (studentData) => {
        setLoading(true);
        try {
            const newStudent = await api.createStudent(studentData);
            setStudents(prev => [...prev, newStudent]);
            return newStudent;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const placeOrder = async (orderData) => {
        setLoading(true);
        try {
            // 1. Create Order
            const newOrder = await api.createOrder(orderData);

            // 2. Update Student Spent
            await api.updateStudentSpent(orderData.studentId, orderData.totalAmount);

            // 3. Update local state for snacks ordersCount (optimistic or re-fetch)
            // Note: json-server doesn't support complex relations updates automatically easily.
            // We will just re-fetch students to get updated spent.
            const updatedStudent = await api.getStudentById(orderData.studentId);
            setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));

            // Update snack order count locally for UI
            // In a real app backend handles this. We'll simulate.
            setSnacks(prev => prev.map(s =>
                s.id === orderData.snackId
                    ? { ...s, ordersCount: (s.ordersCount || 0) + orderData.quantity }
                    : s
            ));

            return newOrder;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        snacks,
        students,
        loading,
        error,
        addStudent,
        placeOrder,
        refreshData: loadData
    };

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
};
