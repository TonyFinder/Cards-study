import React, {ChangeEvent, DetailedHTMLProps, SelectHTMLAttributes} from 'react';
import styled from 'styled-components';

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SelectPropsType = DefaultSelectPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
    value?: string | number
}

export const Select: React.FC<SelectPropsType> = ({
                                                      options, onChangeOption, value
}
) => {
    const mappedOptions: any[] = options ? options.map((opt, i) => (
        <option key={i} >{opt}</option>
    )) : []

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        onChangeOption && onChangeOption(e.currentTarget.value === 'None' ? '' : e.currentTarget.value)
    }

    return (
        <StyledSelect onChange={onChangeCallback} value={value}>
            <option hidden disabled></option>
            {mappedOptions}
        </StyledSelect>
    );
}

const StyledSelect = styled.select`
  padding: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  border: none;
  outline:none;
  border-bottom: 2px solid #aaa;
  
  &:hover {
    border-bottom: 2px solid black;
  }
  > option {
  }
  > option:nth-child(2) {
    font-style: italic;
    color: #aaa;
  }
`;
