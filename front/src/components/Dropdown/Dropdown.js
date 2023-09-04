import "./index.css"

const Dropdown = ({ options, onSelect }) => {
    const handleChange = (e) => {
      const selectedOption = e.target.value;
      onSelect(selectedOption);
    };
  
    return (
      <select onChange={handleChange}>
        <option value="">Selecciona una opción</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

export default Dropdown;