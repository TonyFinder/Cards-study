import React from 'react';
import styled from 'styled-components';

type SortButtonType = {
    title: string
    value?: string
    color?: string
}

export const SortButton = ({title, color, value}: SortButtonType) => {

    return (
            <StyledSort id={value} color={color}>{title}</StyledSort>
    )
}

const StyledSort = styled.div`
  position: relative;
  padding-right: 20px;
  margin: 10px;
  background-color: transparent;
  &:before {
    content: '';
    position: absolute;
    display: ${props => (props.id === '1' || props.id === '0') && 'none'};
    top: 50%; right: 3px;
    transform: translate(0, -50%);
    border: 8px solid ${props => props.color ? props.color : '#53a6fb'};
    border-right-width: 5px;
    border-left-width: 5px;
    border-right-color: transparent;
    border-left-color: transparent;
    border-bottom-width: 0;
  }
  &:after {
    content: '';
    position: absolute;
    display: ${props => (props.id === '2' || props.id === '0') && 'none'};
    top: 50%; right: 3px;
    transform: translate(0, -50%);
    border: 8px solid ${props => props.color ? props.color : '#53a6fb'};
    border-right-width: 5px;
    border-left-width: 5px;
    border-right-color: transparent;
    border-left-color: transparent;
    border-top-width: 0;
  }
`