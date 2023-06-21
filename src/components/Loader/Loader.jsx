import { Dna } from 'react-loader-spinner';
import propTypes from 'prop-types';
import css from './Loader.module.css';

export const MyLoader = props => (
  <div className={css.loader}>
    <Dna
      visible={true}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
      {...props}
    ></Dna>
  </div>
);

MyLoader.propTypes = {
  props: propTypes.object,
};
