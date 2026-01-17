import { useState } from 'react';

function AddItemForm({ onItemAdded }) {
  const [formData, setFormData] = useState({
    item_name: '',
    quantity: 0,
    category: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.item_name.trim()) {
      setError('Item name is required');
      return;
    }

    try {
      const res = await fetch('http://127.0.0.1:8080/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || 'Failed to add item');
      }

      setFormData({ item_name: '', quantity: 0, category: '' });
      onItemAdded();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Item Name *</label>
        <input
          type="text"
          name="item_name"
          value={formData.item_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Initial Quantity</label>
        <input
          type="number"
          name="quantity"
          min="0"
          value={formData.quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g. Electronics, Groceries"
        />
      </div>

      {error && <p style={{ color: 'var(--danger)', margin: '0.8rem 0' }}>{error}</p>}

      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddItemForm;