import { useState, useEffect } from 'react';
import AddItemForm from './components/AddItemForm';
import StockUpdateForm from './components/StockUpdateForm';
import InventoryTable from './components/InventoryTable';
import './index.css';

const API_BASE = 'http://127.0.0.1:8080';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/items`);
      if (!res.ok) throw new Error('Failed to fetch items');
      const data = await res.json();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleItemAdded = () => fetchItems();
  const handleStockUpdated = () => fetchItems();
  const handleItemDeleted = () => fetchItems();

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1>Inventory Management System</h1>
        <p style={{ color: 'var(--gray)' }}>Simple. Clean. Effective.</p>
      </header>

      <div className="forms-grid">
        <div className="card">
          <h2>Add New Item</h2>
          <AddItemForm onItemAdded={handleItemAdded} />
        </div>

        <div className="card">
          <h2>Update Stock</h2>
          <StockUpdateForm onStockUpdated={handleStockUpdated} />
        </div>
      </div>

      <div className="card">
        <h2>Inventory</h2>
        {error && <p style={{ color: 'var(--danger)', marginBottom: '1rem' }}>Error: {error}</p>}
        
        {loading ? (
          <p>Loading inventory...</p>
        ) : (
          <InventoryTable 
            items={items} 
            onDelete={handleItemDeleted} 
          />
        )}
      </div>
    </div>
  );
}

export default App;