const BASE_URL = 'http://localhost:3001';

export const api = {
    // Snacks
    getSnacks: async () => {
        const response = await fetch(`${BASE_URL}/snacks`);
        if (!response.ok) throw new Error('Failed to fetch snacks');
        return response.json();
    },

    // Students
    getStudents: async () => {
        const response = await fetch(`${BASE_URL}/students`);
        if (!response.ok) throw new Error('Failed to fetch students');
        return response.json();
    },

    getStudentById: async (id) => {
        const response = await fetch(`${BASE_URL}/students/${id}`);
        if (!response.ok) throw new Error('Failed to fetch student');
        return response.json();
    },

    createStudent: async (studentData) => {
        const response = await fetch(`${BASE_URL}/students`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData),
        });
        if (!response.ok) throw new Error('Failed to create student');
        return response.json();
    },

    // Orders
    getOrders: async () => {
        const response = await fetch(`${BASE_URL}/orders`);
        if (!response.ok) throw new Error('Failed to fetch orders');
        return response.json();
    },

    createOrder: async (orderData) => {
        const response = await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...orderData,
                timestamp: new Date().toISOString()
            }),
        });
        if (!response.ok) throw new Error('Failed to create order');
        return response.json();
    },

    // Patch to update student spend/orders locally equivalent if needed, 
    // but json-server doesn't auto-calculate totalSpent. We might need to patch student.
    updateStudentSpent: async (id, amount) => {
        // First get current student
        const student = await api.getStudentById(id);
        const newTotal = (student.totalSpent || 0) + amount;

        const response = await fetch(`${BASE_URL}/students/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ totalSpent: newTotal }),
        });
        if (!response.ok) throw new Error('Failed to update student spent');
        return response.json();
    }
};
