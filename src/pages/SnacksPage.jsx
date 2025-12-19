import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import SnackCard from '../components/SnackCard';
import OrderModal from '../components/OrderModal';
import { Search } from 'lucide-react';

const SnacksPage = () => {
    const { snacks, loading, error } = useStore();
    const [selectedSnack, setSelectedSnack] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSnacks = snacks.filter(snack =>
        snack.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="loading">Loading snacks...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Available Snacks</h1>
                <div className="search-bar">
                    <Search size={20} color="#6b7280" />
                    <input
                        type="text"
                        placeholder="Search snacks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="snacks-grid">
                {filteredSnacks.map(snack => (
                    <SnackCard
                        key={snack.id}
                        snack={snack}
                        onOrder={setSelectedSnack}
                    />
                ))}
            </div>

            {filteredSnacks.length === 0 && (
                <div className="empty-state">No snacks found.</div>
            )}

            {selectedSnack && (
                <OrderModal
                    snack={selectedSnack}
                    onClose={() => setSelectedSnack(null)}
                />
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
        h1 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }
        .search-bar {
          position: relative;
          display: flex;
          align-items: center;
          background: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          width: 100%;
          max-width: 300px;
        }
        .search-bar input {
          border: none;
          outline: none;
          margin-left: 0.5rem;
          width: 100%;
          font-size: 0.875rem;
        }
        .snacks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        .loading, .error, .empty-state {
          text-align: center;
          padding: 3rem;
          color: #6b7280;
          font-size: 1.125rem;
        }
        .error { color: #ef4444; }
      `}</style>
        </div>
    );
};

export default SnacksPage;
