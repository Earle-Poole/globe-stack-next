import React, { ChangeEventHandler } from 'react';
import styled from 'styled-components';

interface ToggleProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  size?: number;
}

const Toggle = (props: ToggleProps) => {
  const multiplier = props.size ? props.size / 100 : 1;
  return (
    <ToggleWrapper>
      <Label mul={multiplier}>
        <Input mul={multiplier} type='checkbox' onChange={props.onChange} />
        <Slider mul={multiplier} />
      </Label>
    </ToggleWrapper>
  );
};

export default Toggle;

interface MultiplierProps {
  mul: number;
}

export const ToggleWrapper = styled.div``;
const Label = styled.label<MultiplierProps>`
  position: relative;
  display: inline-block;
  width: ${(props) => props.mul * 60}px;
  height: ${(props) => props.mul * 34}px;
`;

const Slider = styled.span<MultiplierProps>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: ${(props) => props.mul * 34}px;
  &:before {
    position: absolute;
    content: '';
    height: ${(props) => props.mul * 26}px;
    width: ${(props) => props.mul * 26}px;
    left: ${(props) => props.mul * 4}px;
    bottom: ${(props) => props.mul * 4}px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const Input = styled.input<MultiplierProps>`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Slider} {
    background-color: #2196f3;
  }

  &:focus + ${Slider} {
    box-shadow: 0 0 1px #2196f3;
  }

  &:checked + ${Slider}:before {
    -webkit-transform: translateX(${(props) => props.mul * 26}px);
    -ms-transform: translateX(${(props) => props.mul * 26}px);
    transform: translateX(${(props) => props.mul * 26}px);
  }
`;
