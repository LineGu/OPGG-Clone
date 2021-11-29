import React from 'react';
import styled from 'styled-components';
import { IMG_SHAPE_TYPE } from '@constants/style';
import ImageTag, { IImgProps } from '@components/commons/ImageIcon';

const StyledAnchor = styled.a`
  &:hover {
    cursor: pointer;
  }
`;

interface IImgAnchorProps extends IImgProps {
  href: string;
  target?: string;
}

const DEFAULT_ANCHOR_TARGET = '_blank';

function ImgAnchor({ src, alt, size, href, target = DEFAULT_ANCHOR_TARGET }: IImgAnchorProps) {
  return (
    <StyledAnchor href={href} target={target}>
      <ImageTag src={src} alt={alt} size={size} shape={IMG_SHAPE_TYPE.CIRCLE} />
    </StyledAnchor>
  );
}

export default ImgAnchor;
