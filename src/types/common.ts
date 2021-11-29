import { ReactNode } from 'react';

export interface IParentComponentProps {
  children: ReactNode;
}

export interface IChildrenComponentProps {
  className?: string;
}
