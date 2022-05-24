import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import styled from 'styled-components';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type RadioPropsType = DefaultInputPropsType & {
    onClick?: () => void
    disabled?: boolean
    color?: string
}

export const Radio: React.FC<RadioPropsType> = (
    {
        onClick, disabled, color, children,
        ...restProps
    }
) => {

    return (
        <StyledRadio onClick={onClick} style={disabled ? {pointerEvents: 'none', cursor: 'default'} : {}} color={color}>
            <input
                type="radio"
                disabled={disabled}
                readOnly
                {...restProps}
            />
            <label>{children}</label>
        </StyledRadio>
    );
}

const StyledRadio = styled.div`
  margin: 10px;
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
      content: '';
      position: absolute;
      left: 0;
      top: -2px;
      width: 17px;
      height: 17px;
      border: 2px solid #aaa;
      background: #f8f8f8;
      border-radius: 50%;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, .3);
    }

    &:after {
      content: '';
      position: absolute;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      top: 2px;
      left: 4px;
      font-size: 22px;
      background-color: ${props => props.color ? props.color : '#53a6fb'};
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
      background-color: #999;
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
