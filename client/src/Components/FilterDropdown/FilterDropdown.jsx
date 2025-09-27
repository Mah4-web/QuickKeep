
export default function FilterDropdown({ name, value, options, onChange, label }) {
    return (
    <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="entries-select"
    >
        <option value="">{label}</option>
        {options.map((opt) => (
        <option key={opt.name} value={opt.name}>
            {opt.name}
        </option>
        ))}
    </select>
    );
}
