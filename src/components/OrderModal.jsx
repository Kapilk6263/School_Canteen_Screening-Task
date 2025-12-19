import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const OrderModal = ({ snack, onClose }) => {
    const { students, placeOrder } = useStore();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            quantity: 1,
            studentId: ''
        }
    });

    const onSubmit = async (data) => {
        try {
            const student = students.find(s => s.id === Number(data.studentId));
            if (!student) return;

            const orderData = {
                studentId: student.id,
                snackId: snack.id,
                snackName: snack.name,
                quantity: Number(data.quantity),
                totalAmount: Number(data.quantity) * snack.price
            };

            await placeOrder(orderData);
            onClose();
        } catch (error) {
            console.error('Order failed:', error);
            alert('Failed to place order');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>Order {snack.name}</h3>
                    <button className="close-btn" onClick={onClose}><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="order-form">
                    <div className="form-group">
                        <label>Price per item</label>
                        <div className="price-display">₹{snack.price}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="studentId">Select Student</label>
                        <select
                            id="studentId"
                            {...register('studentId', { required: 'Please select a student' })}
                            className={errors.studentId ? 'error' : ''}
                        >
                            <option value="">Choose a student...</option>
                            {students.map(student => (
                                <option key={student.id} value={student.id}>
                                    {student.name}
                                </option>
                            ))}
                        </select>
                        {errors.studentId && <span className="error-msg">{errors.studentId.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantity">Quantity (1-5)</label>
                        <input
                            type="number"
                            id="quantity"
                            min="1"
                            max="5"
                            {...register('quantity', {
                                required: true,
                                min: { value: 1, message: 'Minimum 1' },
                                max: { value: 5, message: 'Maximum 5' }
                            })}
                            className={errors.quantity ? 'error' : ''}
                        />
                        {errors.quantity && <span className="error-msg">{errors.quantity.message}</span>}
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Placing Order...' : 'Confirm Order'}
                        </button>
                    </div>
                </form>
            </div>

            <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          backdrop-filter: blur(4px);
        }
        .modal {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .modal-header h3 {
          margin: 0;
          font-size: 1.25rem;
        }
        .close-btn {
          background: none;
          border: none;
          padding: 4px;
          color: #6b7280;
          border-radius: 50%;
        }
        .close-btn:hover {
          background: #f3f4f6;
          color: #1f2937;
        }
        .form-group {
          margin-bottom: 1.25rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          font-size: 0.875rem;
        }
        .price-display {
          font-weight: 600;
          font-size: 1.125rem;
          color: var(--primary-color);
        }
        select, input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          font-size: 1rem;
        }
        select:focus, input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
        .error {
          border-color: #ef4444;
        }
        .error-msg {
          color: #ef4444;
          font-size: 0.75rem;
          margin-top: 0.25rem;
          display: block;
        }
        .modal-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }
        .cancel-btn, .submit-btn {
          flex: 1;
          padding: 0.75rem;
          border-radius: 8px;
          font-weight: 500;
          border: none;
        }
        .cancel-btn {
          background: #f3f4f6;
          color: #4b5563;
        }
        .cancel-btn:hover {
          background: #e5e7eb;
        }
        .submit-btn {
          background: var(--primary-color);
          color: white;
        }
        .submit-btn:hover:not(:disabled) {
          background: #4338ca;
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
        </div>
    );
};

export default OrderModal;
