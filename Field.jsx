function Field({ label, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input
        className={`form-input${error ? ' error' : ''}`}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

export default Field;
