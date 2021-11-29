import { IParentComponentProps } from '@types';
import React from 'react';
import styled from 'styled-components';

const LayoutFixer = styled.div`
  position: relative;
  background-color: #eaeaea;
  min-height: 100vh;
  overflow: hidden;

  .layout-fixer {
    position: relative;
    width: 1000px;
    height: 100%;
    margin: 0 auto;
  }
`;

const BodyLayout = ({ children }: IParentComponentProps) => {
  return <LayoutFixer>{children}</LayoutFixer>;
};

export default BodyLayout;
