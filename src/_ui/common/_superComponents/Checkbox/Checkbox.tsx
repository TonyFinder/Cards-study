import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import styled from 'styled-components';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type CheckboxPropsType = DefaultInputPropsType & {
    onClick?: () => void
    disabled?: boolean
    color?: string
}

export const Checkbox: React.FC<CheckboxPropsType> = ({
    onClick, disabled, color, children,
    ...restProps}
) => {

    return (
        <StyledCheckbox onClick={onClick} style={disabled ? {pointerEvents: "none", cursor: "default"} : {}} color={color}>
            <input
                type="checkbox"
                disabled={disabled}
                readOnly
                {...restProps}
            />
            <label>{children}</label>
        </StyledCheckbox>
    );
}

const StyledCheckbox = styled.div`
  margin: 10px;
  //border: 1px solid black;
  > input {
    opacity: 0;
    display: none;
  }
  > input + label {
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    
    &:before {
      content: ''; // квадрат
      position: absolute;
      left:0; top: -2px;
      width: 17px; height: 17px;
      border: 2px solid #aaa; // цвет границы чекбокса
      background: #f8f8f8; // цвет фона чекбокса
      border-radius: 3px;
      box-shadow: inset 0 1px 3px rgba(0,0,0,.3);
    }
    &:after {
      content: '✔';
      position: absolute;
      top: -7px; left: 2px;
      font-size: 22px;
      color: ${props => props.color ? props.color : '#53a6fb'};
      transition: all .2s;
    }
  }
  > input:not(:checked) + label {
      &:after {
        opacity: 0;
        transform: scale(0);
      }
  }
  > input:disabled + label {
      &:before {
        box-shadow: none;
        border-color: #bbb;
        background-color: #ddd;
      }
  }
  > input:checked:not(:disabled) + label {
    &:before {
      border: 2px solid ${props => props.color ? props.color : '#53a6fb'};
    }
    &:after {
      opacity: 1;
      transform: scale(1);
    }
  }
  > input:disabled:checked + label {
    &:after {
      color: #999;
    }
  }
  > input:disabled + label {
    color: #aaa;
  }
  > input:checked:focus + label, input:not(:checked):focus + label {
    &:before {
      border: 1px dotted blue;
    }
  }
`;
