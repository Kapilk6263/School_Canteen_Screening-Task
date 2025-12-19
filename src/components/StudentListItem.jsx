import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const StudentListItem = ({ student }) => {
    return (
        <Link to={`/students/${student.id}`} className="student-item">
            <div className="student-info">
                <h3 className="student-name">{student.name}</h3>
                <p className="student-code">Code: {student.referralCode}</p>
            </div>
            <div className="student-meta">
                <span className="total-spent">Spent: ₹{student.totalSpent || 0}</span>
                <ChevronRight size={20} color="#9ca3af" />
            </div>

            <style>{`
        .student-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: white;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          transition: background-color 0.2s, transform 0.2s;
        }
        .student-item:hover {
          background-color: #f9fafb;
          transform: translateX(4px);
        }
        .student-name {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
        }
        .student-code {
          margin: 0.25rem 0 0;
          font-size: 0.875rem;
          color: #6b7280;
        }
        .student-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .total-spent {
          font-weight: 600;
          color: var(--primary-color);
        }
      `}</style>
        </Link>
    );
};

export default StudentListItem;
