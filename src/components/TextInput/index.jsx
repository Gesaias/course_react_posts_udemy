import './styles.css';

export const TextInput = ({ searchValue, handleChange, placeholder }) => {
    return (
        <input
            className='text-input'
            onChange={handleChange}
            value={searchValue}
            type='search'
            placeholder={placeholder}
        />
    );
};
