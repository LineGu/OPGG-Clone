import { IChildrenComponentProps } from '@types';
import React from 'react';
import styled from 'styled-components';

interface IBadgeProps extends IChildrenComponentProps {
  content: string;
  color: string;
  borderColor: string;
}

const StyledBadge = styled.div<{ color: string; borderColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 11px;
  padding: 3px 5px;
  border-radius: 9px;
  border: solid 1px ${({ borderColor }) => borderColor};
  background-color: ${({ color }) => color};

  & > span {
    font-family: AppleSDGothicNeo;
    font-size: 10px;
    letter-spacing: -0.38px;
    color: #fff;
  }
`;

function Badge({ content, color, borderColor, className }: IBadgeProps) {
  return (
    <StyledBadge color={color} borderColor={borderColor} className={className}>
      <span>{content}</span>
    </StyledBadge>
  );
}

export default Badge;
