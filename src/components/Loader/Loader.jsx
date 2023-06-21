import { Dna } from 'react-loader-spinner';

export const MyLoader = props => (
  <Dna
    visible={true}
    height="80"
    width="80"
    ariaLabel="dna-loading"
    wrapperStyle={{}}
    wrapperClass="dna-wrapper"
    {...props}
  ></Dna>
);
