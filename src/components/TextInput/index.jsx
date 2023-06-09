import P from 'prop-types';
import './styles.css';

export const TextInput = ({ searchValue, handleChange, placeholder }) => {
  return (
    <input className="text-input" onChange={handleChange} value={searchValue} type="search" placeholder={placeholder} />
  );
};

TextInput.propTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired,
  placeholder: P.string.isRequired,
};
