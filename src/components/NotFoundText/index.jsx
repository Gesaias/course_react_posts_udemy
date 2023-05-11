import P from 'prop-types';
import './styles.css';

export const NotFoundText = ({ center }) => <p className={center ? 'center' : ''}>Nenhum post encontrado!!</p>;

NotFoundText.propTypes = {
  center: P.bool.isRequired,
};
