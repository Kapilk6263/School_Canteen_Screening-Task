import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api'; // Direct API usage or could add to store. Store mainly has lists.
import { useStore } from '../context/StoreContext';
import { ArrowLeft, History, DollarSign, Wallet } from 'lucide-react';
import OrderModal from '../components/OrderModal';
import SnackCard from '../components/SnackCard'; // Using the card UI for snacks reference if needed, or simple list.

// Page to show details and order history.
const StudentDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { students, snacks } = useStore(); // Get shared data if needed

    const [student, setStudent] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSnack, setSelectedSnack] = useState(null); // To place order from here if we want

    // Fetch student specific details including fresh orders
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const studentData = await api.getStudentById(id);
                const allOrders = await api.getOrders();
                // Filter orders for this student. In real backend we'd filter via API query.
                const studentOrders = allOrders.filter(o => o.studentId === Number(id)).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

                setStudent(studentData);
                setOrders(studentOrders);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div className="loading">Loading details...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!student) return <div className="error">Student not found</div>;

    return (
        <div className="page-container">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <ArrowLeft size={20} /> Back
            </button>

            <div className="student-header-card">
                <div className="avatar-placeholder">{student.name.charAt(0)}</div>
                <div className="info">
                    <h1>{student.name}</h1>
                    <p className="code">Referral: {student.referralCode}</p>
                </div>
                <div className="stats">
                    <div className="stat-item">
                        <Wallet size={20} className="icon" />
                        <div>
                            <span className="label">Total Spent</span>
                            <span className="value">₹{student.totalSpent}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="orders-section">
                <h2><History size={20} /> Order History</h2>
                {orders.length === 0 ? (
                    <p className="empty-history">No orders placed yet.</p>
                ) : (
                    <div className="orders-list">
                        {orders.map(order => (
                            <div key={order.id} className="order-item">
                                <div className="order-details">
                                    <span className="snack-name">{order.snackName}</span>
                                    <span className="order-date">{new Date(order.timestamp).toLocaleString()}</span>
                                </div>
                                <div className="order-meta">
                                    <span className="quantity">x{order.quantity}</span>
                                    <span className="amount">₹{order.totalAmount}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Optional: Add "New Order" button here that opens a snack selector? 
           Requirements say "Option to place a new order".
           Maybe reuse Snacks Page but pre-select student? 
           For now, let's keep it simple: link to snacks page or show a simple "Order Snack" button which opens a modal with snack selection. 
           But modal implementation above requires snack input first. 
           Let's just add a button "Go to Menu" for simplicity as the modal flow is Snack -> Student.
           Or we can reverse it but that requires new component. 
           Lets stick to "Go to Menu" button. 
       */}
            <div className="fab-container">
                <button className="fab" onClick={() => navigate('/')}>
                    + New Order
                </button>
            </div>

            <style>{`
        .student-header-card {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .avatar-placeholder {
          width: 80px;
          height: 80px;
          background: #e0e7ff;
          color: var(--primary-color);
          font-size: 2rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        .info h1 {
          margin: 0;
          font-size: 1.5rem;
        }
        .info .code {
          color: #6b7280;
          margin: 0.5rem 0 0;
        }
        .stats {
          margin-left: auto;
          background: #f9fafb;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          border: 1px solid var(--border-color);
        }
        .stat-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .stat-item .icon {
          color: var(--primary-color);
        }
        .stat-item .label {
          display: block;
          font-size: 0.875rem;
          color: #6b7280;
        }
        .stat-item .value {
          display: block;
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
        }

        .orders-section h2 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }
        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .order-item {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .order-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .snack-name {
          font-weight: 600;
        }
        .order-date {
          font-size: 0.875rem;
          color: #9ca3af;
        }
        .order-meta {
          text-align: right;
        }
        .quantity {
          display: block;
          font-size: 0.875rem;
          color: #6b7280;
        }
        .amount {
          display: block;
          font-weight: 600;
          color: var(--primary-color);
        }
        .empty-history {
          color: #9ca3af;
          font-style: italic;
        }
        .back-btn {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6b7280;
          margin-bottom: 2rem;
          padding: 0;
        }
        .back-btn:hover {
          color: var(--primary-color);
        }

        .fab-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
        }
        .fab {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 1rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }
        .fab:hover {
          transform: translateY(-2px);
          background: #4338ca;
        }
      `}</style>
        </div>
    );
};

export default StudentDetailPage;
