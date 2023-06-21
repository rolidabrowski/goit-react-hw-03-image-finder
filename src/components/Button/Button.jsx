import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ children, onClick }) => {
  return (
    <button className={css.button} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
};
