import styled from 'styled-components';
import React, {ChangeEvent, KeyboardEvent, DetailedHTMLProps, InputHTMLAttributes, useCallback} from 'react';
import {COLORS} from '../../../../utils/_values';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onChangeError?: (value: boolean) => void
    onEnter?: () => void
    error?: boolean
    emailError?: boolean
    passwordError?: boolean
    comparePassword?: boolean
    value?: string
    sign?: string
}

export const Input: React.FC<InputPropsType> = React.memo( (
    {
        error, emailError, passwordError, comparePassword, onChange, onChangeText, onChangeError,
        onEnter, onKeyDown, color, value, sign,
        ...restProps
    }
) => {
    const onChangeHandler = useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        onChangeText && onChangeText(e.currentTarget.value)
        onChange && onChange(e)
        onChangeError && onChangeError(false)
    }, [onChange, onChangeError, onChangeText])
    const onKeyDownCheck = useCallback( (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyDown && onKeyDown(e)
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            (value)
                ? onEnter && onEnter()
                : onChangeError && onChangeError(true)
        }
    }, [onKeyDown, onEnter, onChangeError, value])
    const onBlurHandler = useCallback( () => {
        if (!value) onChangeError && onChangeError(true)
    }, [onChangeError, value])

    return (
        <StyledInput color={color} error={error}
                     value={value} sign={sign}
                     emailError={emailError} passwordError={passwordError} comparePassword={comparePassword} >
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
})

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
    background-color: ${props => props.error || props.emailError || props.passwordError || props.comparePassword ? '#fdd9d9' : COLORS.MAIN_LIGHT};
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
    content: '${props =>
            props.emailError
                    ? 'Email is typed wrong'
                    : props.passwordError
                            ? 'Must be at least 8 characters'
                            : props.comparePassword
                                    ? 'Password and confirm password are different'
                                    : 'Text is required'}';
    display: ${props => props.error || props.emailError || props.passwordError || props.comparePassword ? '' : 'none'};
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