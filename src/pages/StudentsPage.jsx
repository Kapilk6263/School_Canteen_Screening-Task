import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import StudentListItem from '../components/StudentListItem';
import { Plus, Search } from 'lucide-react';

const StudentsPage = () => {
    const { students, loading, error } = useStore();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.referralCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="loading">Loading students...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Students</h1>
                <div className="header-actions">
                    <div className="search-bar">
                        <Search size={20} color="#6b7280" />
                        <input
                            type="text"
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Link to="/students/new" className="create-btn">
                        <Plus size={20} />
                        Add Student
                    </Link>
                </div>
            </div>

            <div className="students-list">
                {filteredStudents.map(student => (
                    <StudentListItem key={student.id} student={student} />
                ))}
            </div>

            {filteredStudents.length === 0 && (
                <div className="empty-state">No students found.</div>
            )}

            <style>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .header-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        .search-bar {
          display: flex;
          align-items: center;
          background: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }
        .search-bar input {
          border: none;
          outline: none;
          margin-left: 0.5rem;
          background: transparent;
        }
        .create-btn {
          background-color: var(--primary-color);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        .create-btn:hover {
          background-color: #4338ca;
        }
        .students-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .loading, .error, .empty-state {
          text-align: center;
          padding: 3rem;
          color: #6b7280;
        }
      `}</style>
        </div>
    );
};

export default StudentsPage;
