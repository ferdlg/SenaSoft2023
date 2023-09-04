import "./index.css"

const Dropdown = ({ options, onSelect, label }) => {
    const handleChange = (e) => {
      const selectedOption = e.target.value;
      onSelect(selectedOption);
    };
  
    return (
      <div className="lista-opciones">
      <label>{label}</label>
      <select onChange={handleChange}>
        <option value="">Selecciona {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      </div>
    );
  };

export default Dropdown;