import './styles.css';

export const Loading = ({ center }) => (
    <p className={center ? 'center' : ''}>Carregando...</p>
);
