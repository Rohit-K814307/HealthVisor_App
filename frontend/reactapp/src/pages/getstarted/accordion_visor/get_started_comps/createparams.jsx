import React, { useState, useEffect } from 'react';
import {  DropdownWrapper, StyledSelect, StyledOption,StyledLabel, StyledButton } from "./params";

export function Dropdown(props) {
    return (
      <DropdownWrapper action={props.action}>
        <StyledLabel htmlFor="services">
          {props.formLabel}
        </StyledLabel>
        <StyledSelect id="services" name="services">
          {props.children}
        </StyledSelect>
        <StyledButton type="submit" value={props.buttonText} />
      </DropdownWrapper>
    );
  }
  
  export function Option(props) {
    return (
      <StyledOption selected={props.selected}>
        {props.value}
      </StyledOption>
    );
  }