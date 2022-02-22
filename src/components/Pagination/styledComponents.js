import styled from 'styled-components/macro'

export const PageButton = styled.button`
  cursor: pointer;
  outline: none;

  color: ${props => (props.isActive ? '#0074d9' : '#ffffff')};
  border: 2px solid ${props => (props.isActive ? '#0074d9' : '#ffffff')};

  background-color: ${props => (props.isActive ? 'transparent' : '#0074d9')};
`

export const StartingDoubleLeftButton = styled.button`
  font-family: 'Roboto';
  font-weight: 600;
  cursor: pointer;
  outline: none;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  color: ${props => (props.isDisabled ? '#ffffff' : 'gray')};
  border: 2px solid ${props => (props.isDisabled ? '#0074d9' : 'gray')};
  background-color: ${props => (props.isDisabled ? '#0074d9' : 'gray')};
`

export const PreviousButton = styled.button`
  font-family: 'Roboto';
  cursor: pointer;
  outline: none;
  font-weight: 600;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  color: ${props => (props.isDisabled ? '#ffffff' : 'gray')};
  border: 2px solid ${props => (props.isDisabled ? '#0074d9' : 'gray')};
  background-color: ${props => (props.isDisabled ? '#0074d9' : 'gray')};
`
export const ForwardButton = styled.button`
  font-family: 'Roboto';
  cursor: pointer;
  outline: none;
  font-weight: 600;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  color: ${props => (props.isDisabled ? '#ffffff' : 'gray')};
  border: 2px solid ${props => (props.isDisabled ? '#0074d9' : 'gray')};
  background-color: ${props => (props.isDisabled ? '#0074d9' : 'gray')};
`
export const EndButton = styled.button`
  font-family: 'Roboto';
  cursor: pointer;
  outline: none;
  font-weight: 600;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  color: ${props => (props.isDisabled ? '#ffffff' : 'gray')};
  border: 2px solid ${props => (props.isDisabled ? '#0074d9' : 'gray')};
  background-color: ${props => (props.isDisabled ? '#0074d9' : 'gray')};
`
