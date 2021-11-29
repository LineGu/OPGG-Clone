import React from 'react';
import styled from 'styled-components';
import { IMG_SHAPE_TYPE } from '@constants/style';
import { IChildrenComponentProps } from '@types';

type ImgShapeType = 'rect' | 'circle';

export interface IImgProps extends IChildrenComponentProps {
  src: string;
  alt: string;
  shape?: ImgShapeType;
  size?: number;
}

const StyledImg = styled.img<IImgProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ shape }) => (shape === IMG_SHAPE_TYPE.RECT ? '0%' : '50%')}; ;
`;

const DEFAULT_IMG_SHAPTE = IMG_SHAPE_TYPE.RECT;
const DEFAULT_IMG_SIZE = 45;

function ImageIcon({
  src,
  alt,
  shape = DEFAULT_IMG_SHAPTE,
  size = DEFAULT_IMG_SIZE,
  className,
}: IImgProps) {
  return (
    <StyledImg src={src} alt={alt} shape={shape} size={size} className={className}></StyledImg>
  );
}

export default ImageIcon;
