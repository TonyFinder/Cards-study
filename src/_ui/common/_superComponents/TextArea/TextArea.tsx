import styled from 'styled-components';
import React, {ChangeEvent, DetailedHTMLProps, TextareaHTMLAttributes, useCallback} from 'react';
import {COLORS} from '../../../../utils/_values';

type DefaultTextAreaPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

type TextAreaPropsType = DefaultTextAreaPropsType & {
    onChangeText?: (value: ChangeEvent<HTMLTextAreaElement> ) => void
    onChangeError?: (value: boolean) => void
    onEnter?: () => void
    error?: boolean
    emailError?: boolean
    passwordError?: boolean
    comparePassword?: boolean
    value?: string
    sign?: string
}

export const TextArea: React.FC<TextAreaPropsType> = React.memo( (
    {
        error, emailError, passwordError, comparePassword, onChange, onChangeText, onChangeError,
        onEnter, onKeyDown, color, value, sign,
        ...restProps
    }
) => {
    const onBlurHandler = useCallback( () => {
        if (!value) onChangeError && onChangeError(true)
    }, [value, onChangeError])

    return (
        <StyledTextArea color={color} error={error} sign={sign}
                        emailError={emailError} passwordError={passwordError} comparePassword={comparePassword}>
            <textarea
                name="" cols={30} rows={10}
                onBlur={onBlurHandler}
                style={error ? {borderBottom: '2px solid red'} : {}}
                value={value}
                onChange={(e) => onChangeText ? onChangeText( e) : null}
                {...restProps}
            > </textarea>
        </StyledTextArea>
    )
})

const StyledTextArea = styled.div<TextAreaPropsType>`
  position: relative;
  margin: 30px 10px;

  > textarea {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    padding: 10px;
    border: none;
    outline: none;
    border-bottom: 2px solid ${props => props.value
            ? '#bebebe' : props.color ? props.color : '#53a6fb'};
    border-radius: 8px;
    background-color: ${props => props.error || props.emailError || props.passwordError || props.comparePassword ? '#fdd9d9' : COLORS.MAIN_LIGHT};
  }

  > textarea:disabled {
    border-bottom: 2px solid #878787;
    opacity: 0.6;
  }

  > textarea:focus {
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
    bottom: -17px;
    right: 0;
  }

  &:after {
    position: absolute;
    content: '${props => props.sign}';
    display: ${props => props.sign ? '' : 'none'};
    color: #878787;
    font-size: 13px;
    top: -15px;
    left: 5px;
  }

`