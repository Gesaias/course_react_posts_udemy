import P from 'prop-types';
import './styles.css';

export const Loading = ({ center }) => <p className={center ? 'center' : ''}>Loading...</p>;

Loading.propTypes = {
  center: P.bool.isRequired,
};
