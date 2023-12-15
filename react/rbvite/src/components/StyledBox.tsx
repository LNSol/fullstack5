import styled, { css } from 'styled-components';
import classnames from 'classnames/bind';
import styles from './StyledBox.module.css';

const cx = classnames.bind(styles);

type BoxProps = {
  bg: string;
  highlight?: boolean;
};

const Box = styled.div<BoxProps>`
  background-color: ${({ bg }) => bg};
  ${({ highlight }) =>
    highlight &&
    css`
      border-radius: 20px 20px;
      color: red;
    `}
  &:hover {
    background-color: gray;
  }
`;

const BorderBox = styled(Box)`
  border: 2px solid black;
`;

const StyledBox = () => {
  return (
    <>
      {/* <Box bg='yellow' highlight> */}
      <BorderBox bg='yellow' highlight>
        <h2>styled-components</h2>
      </BorderBox>
      <div className={cx('bg-green', { border: true })}>
        <h2>classnames</h2>
      </div>
      {/* </Box> */}
    </>
  );
};
export default StyledBox;
