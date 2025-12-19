import React from 'react';
import { Plus } from 'lucide-react';

const SnackCard = ({ snack, onOrder }) => {
    return (
        <div className="snack-card">
            <div className="snack-info">
                <h3 className="snack-name">{snack.name}</h3>
                <p className="snack-price">₹{snack.price}</p>
            </div>
            <div className="snack-actions">
                <span className="orders-count">{snack.ordersCount || 0} orders</span>
                <button className="order-btn" onClick={() => onOrder(snack)}>
                    <Plus size={16} />
                    Add
                </button>
            </div>

            <style>{`
        .snack-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .snack-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .snack-name {
          margin: 0;
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-color);
        }
        .snack-price {
          margin: 0.25rem 0 0;
          color: #6b7280;
          font-weight: 500;
        }
        .snack-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }
        .orders-count {
          font-size: 0.875rem;
          color: #9ca3af;
        }
        .order-btn {
          background-color: var(--primary-color);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: background-color 0.2s;
        }
        .order-btn:hover {
          background-color: #4338ca;
        }
      `}</style>
        </div>
    );
};

export default SnackCard;
