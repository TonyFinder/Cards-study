import React, {ChangeEvent, DetailedHTMLProps, SelectHTMLAttributes, useCallback} from 'react';
import styled from 'styled-components';

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SelectPropsType = DefaultSelectPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
    value?: string | number
    color?: string
    disabled?: boolean
}

export const Select: React.FC<SelectPropsType> = React.memo((
    {
        options, onChangeOption, value, color,
        disabled
    }
) => {
    const mappedOptions: any[] = options ? options.map((opt, i) => (
        <option key={i}>{opt}</option>
    )) : []

    const onChangeCallback = useCallback( (e: ChangeEvent<HTMLSelectElement>) => {
        onChangeOption && onChangeOption(e.currentTarget.value === 'None' ? '' : e.currentTarget.value)
    }, [onChangeOption])

    return (
        <StyledSelect onChange={onChangeCallback} value={value} color={color} disabled={disabled}>
            <option hidden disabled></option>
            {mappedOptions}
        </StyledSelect>
    )
})

const StyledSelect = styled.select`
  padding: 10px;
  margin: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  border: none;
  outline: none;
  border-bottom: 2px solid ${props => props.value === '' && !props.disabled
          ? props.color ? props.color : '#53a6fb'
          : props.disabled ? '#bebebe' : 'black'};

  > option {
    &:nth-child(2) {
      font-style: italic;
      color: #aaa;
    }
  }
`;
