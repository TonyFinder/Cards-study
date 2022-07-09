import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import styled from 'styled-components';
import {COLORS} from '../../../../utils/_values';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type CheckboxPropsType = DefaultInputPropsType & {
    onClick?: () => void
    disabled?: boolean
    color?: string
}

export const Checkbox: React.FC<CheckboxPropsType> = React.memo( ({
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
    )
})

const StyledCheckbox = styled.div`
  position: relative;
  margin: 0 10px 30px 10px;
  font-size: 14px;
  font-weight: 500;
  > input {
    position: absolute;
    top: 0; left: 0;
    opacity: 0;
    width: 21px; height: 21px;
    margin: 0;
    z-index: 3;
  }
  > input + label {
    padding-left: 25px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    
    &:before {
      content: '';
      position: absolute;
      left:0; top: 0;
      width: 17px; height: 17px;
      border: 2px solid #aaa;
      background: transparent;
      border-radius: 3px;
      box-shadow: inset 0 1px 3px rgba(0,0,0,.3);
    }
    &:after {
      content: '✔';
      position: absolute;
      top: -5px; left: 2px;
      font-size: 22px;
      color: ${props => props.color ? props.color : COLORS.DEFAULT};
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
`;
