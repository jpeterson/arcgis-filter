import styled from 'styled-components';
import { unitCalc } from 'calcite-react/utils/helpers';

const StyledSetHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledAddSetButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => unitCalc(props.theme.baseline, 3, '/')};
  cursor: pointer;
  background: ${props => props.theme.palette.lightestGray};
  border: 1px solid ${props => props.theme.palette.lighterGray};
  opacity: 0.7;
  transition: opacity 175ms linear;

  &:hover {
    opacity: 1;
  }
`;

export { StyledSetHeaderRow, StyledAddSetButton };
