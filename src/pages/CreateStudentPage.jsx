import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { UserPlus, ArrowLeft } from 'lucide-react';

const CreateStudentPage = () => {
    const { addStudent } = useStore();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const generateReferralCode = (name) => {
        const prefix = name.replace(/[^a-zA-Z]/g, '').slice(0, 4).toUpperCase();
        const randomNum = Math.floor(1000 + Math.random() * 9000); // 4 digit random
        return `${prefix}${randomNum}`;
    };

    const onSubmit = async (data) => {
        try {
            const studentData = {
                name: data.name,
                referralCode: generateReferralCode(data.name),
                totalSpent: 0
            };
            await addStudent(studentData);
            navigate('/students');
        } catch (error) {
            console.error('Failed to create student:', error);
            alert('Failed to create student.');
        }
    };

    return (
        <div className="page-container">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <ArrowLeft size={20} /> Back
            </button>

            <div className="form-card">
                <div className="form-header">
                    <UserPlus className="icon" size={32} />
                    <h1>Add New Student</h1>
                    <p>Create a profile for a new student to start tracking orders.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="e.g. John Doe"
                            {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name too short' } })}
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-msg">{errors.name.message}</span>}
                    </div>

                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create Student'}
                    </button>
                </form>
            </div>

            <style>{`
        .page-container {
          max-width: 600px;
          margin: 0 auto;
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
        .form-card {
           background: white;
           padding: 2.5rem;
           border-radius: 16px;
           box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
           border: 1px solid var(--border-color);
        }
        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .form-header .icon {
          color: var(--primary-color);
          background: #e0e7ff;
          padding: 12px;
          border-radius: 12px;
          width: 56px;
          height: 56px;
          box-sizing: content-box; 
          margin-bottom: 1rem;
        }
        .form-header h1 {
          font-size: 1.5rem;
          margin: 0 0 0.5rem;
        }
        .form-header p {
          color: #6b7280;
          margin: 0;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          font-size: 1rem;
        }
        input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
        .error { border-color: #ef4444; }
        .error-msg { color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem; display: block; }
        
        .submit-btn {
          width: 100%;
          padding: 0.875rem;
          background-color: var(--primary-color);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          transition: background-color 0.2s;
        }
        .submit-btn:hover:not(:disabled) {
          background-color: #4338ca;
        }
      `}</style>
        </div>
    );
};

export default CreateStudentPage;
