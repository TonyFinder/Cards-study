import styled from 'styled-components';
import React, {ChangeEvent, KeyboardEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onChangeError?: (value: boolean) => void
    onEnter?: () => void
    error?: boolean
    value?: string
    sign?: string
}

export const Input: React.FC<InputPropsType> = (
    {
        error, onChange, onChangeText, onChangeError,
        onEnter, onKeyDown, color, value, sign,
        ...restProps
    }
) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeText && onChangeText(e.currentTarget.value)
        onChange && onChange(e)
        onChangeError && onChangeError(false)
    }
    const onKeyDownCheck = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyDown && onKeyDown(e)
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            (value)
                ? onEnter && onEnter()
                : onChangeError && onChangeError(true)
        }
    }
    const onBlurHandler = () => {
        if (!value) onChangeError && onChangeError(true)
    }

    return (
        <StyledInput color={color} error={error} value={value} sign={sign}>
            <input
                type={'text'}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownCheck}
                onBlur={onBlurHandler}
                style={error ? {borderBottom: '2px solid red'} : {}}
                value={value}
                {...restProps}
            />
        </StyledInput>
    )
}

const StyledInput = styled.div<InputPropsType>`
  position: relative;
  margin: 30px 10px;

  > input {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    padding: 10px;
    border: none;
    outline: none;
    border-bottom: 2px solid ${props => props.value
            ? '#bebebe' : props.color ? props.color : '#53a6fb'};
    border-radius: 8px 8px 0 0;
    background-color: ${props => props.error ? '#fdd9d9' : '#efefef'};
  }

  > input:disabled {
    border-bottom: 2px solid #878787;
    opacity: 0.6;
  }

  > input:focus {
    border-bottom: 2px solid #878787;
  }

  &:before {
    position: absolute;
    content: 'Text is required';
    display: ${props => props.error ? '' : 'none'};
    color: red;
    font-size: 13px;
    bottom: -17px; right: 0;
  }
  &:after {
    position: absolute;
    content: '${props => props.sign}';
    display: ${props => props.sign ? '' : 'none'};
    color: #878787;
    font-size: 13px;
    top: -15px; left: 5px;
  }

`