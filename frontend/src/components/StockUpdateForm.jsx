import { useState } from 'react';

function StockUpdateForm({ onStockUpdated }) {
  const [id, setId] = useState('');
  const [change, setChange] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const itemId = Number(id);
    const qtyChange = Number(change);

    if (!itemId || isNaN(qtyChange)) {
      setError('Please enter valid ID and change value');
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:8080/items/${itemId}/stock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ add: qtyChange })   // ← change this to { add: qtyChange } if your backend uses "add"
      });

      if (!res.ok) throw new Error('Failed to update stock');

      setId('');
      setChange('');
      onStockUpdated();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Item ID *</label>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          min="1"
          required
        />
      </div>

      <div className="form-group">
        <label>Change Quantity</label>
        <input
          type="number"
          value={change}
          onChange={(e) => setChange(e.target.value)}
          placeholder="Positive = add, negative = remove"
          required
        />
      </div>

      {error && <p style={{ color: 'var(--danger)', margin: '0.8rem 0' }}>{error}</p>}

      <button type="submit">Update Stock</button>
    </form>
  );
}

export default StockUpdateForm;