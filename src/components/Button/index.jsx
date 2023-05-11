import P from 'prop-types';
import './styles.css';

export const Button = ({ name, onClick, disabled }) => (
  <button disabled={disabled} className="button" onClick={onClick}>
    {name}
  </button>
);

Button.propTypes = {
  name: P.string.isRequired,
  disabled: P.bool.isRequired,
  onClick: P.func.isRequired,
};
