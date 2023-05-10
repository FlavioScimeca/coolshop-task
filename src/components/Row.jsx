export default function Row({ row, handleChange, index, removeRow }) {
  return (
    <div className="row">
      <select
        value={row.sign}
        onChange={(e) => handleChange(index, 'sign', e.target.value)}
      >
        <option value="+">+</option>
        <option value="-">-</option>
      </select>
      <input
        type="number"
        value={row.value}
        onChange={(e) => handleChange(index, 'value', e.target.value)}
        disabled={!row.enabled}
      />
      <button onClick={() => removeRow(index)}>Remove</button>
      <input
        type="checkbox"
        checked={row.enabled}
        onChange={(e) => handleChange(index, 'enabled', e.target.checked)}
      />
    </div>
  );
}
