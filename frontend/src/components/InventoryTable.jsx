function InventoryTable({ items, onDelete }) {
  const handleDelete = async (id) => {
    if (!window.confirm(`Delete item #${id}?`)) return;

    try {
      const res = await fetch(`http://127.0.0.1:8080/items/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) onDelete();
    } catch (err) {
      alert('Failed to delete item');
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Quantity</th>
          <th>Name</th>

          <th>Category</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.length === 0 ? (
          <tr>
            <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
              No items in inventory yet
            </td>
          </tr>
        ) : (
          items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.quantity}</td>
              <td>{item.item_name}</td>
              <td>{item.category || '—'}</td>
              <td className={item.status === 'OUT_OF_STOCK' || item.status === 'LOW_STOCK' ? 'status-low' : 'status-available'}>
                {item.status}
              </td>
              <td>
                <button 
                  className="danger" 
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default InventoryTable;