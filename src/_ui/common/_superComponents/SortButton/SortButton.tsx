import React from 'react';
import styled from 'styled-components';

type SortButtonType = {
    title: string | number
    value?: string
    color?: string
    onClick?: () => void
}

export const SortButton = ({title, color, value, onClick}: SortButtonType) => {

    return (
        <div style={{display: 'flex'}} onClick={onClick}>
            <StyledSort id={value} color={color}>{title}</StyledSort>
        </div>
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
    display: ${props => (props.id === '1' || props.id === '2') && 'none'};
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
    display: ${props => (props.id === '0' || props.id === '2') && 'none'};
    top: 50%; right: 3px;
    transform: translate(0, -50%);
    border: 8px solid ${props => props.color ? props.color : '#53a6fb'};
    border-right-width: 5px;
    border-left-width: 5px;
    border-right-color: transparent;
    border-left-color: transparent;
    border-top-width: 0;
  }
  &:hover {
    cursor: pointer;
  }
`