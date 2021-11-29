import { IChildrenComponentProps } from 'src/types';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface IProfileIcon extends IChildrenComponentProps {
  borderSrc: string;
  profileSrc: string;
  level: number;
}

const StyledProfileIcon = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  .profile-image {
    width: 100px;
    height: 100px;
  }
`;

const StyledTierBorder = styled.div<{ borderSrc: string }>`
  position: absolute;
  left: -10px;
  top: -10px;
  width: 120px;
  height: 120px;
  background-position: center bottom;
  background-repeat: no-repeat;
  background-image: url(${({ borderSrc }) => borderSrc});
`;

const StyledLevelBox = styled.span`
  position: absolute;
  bottom: -8px;
  left: calc(50% - 22px);
  width: 44px;
  height: 24px;
  padding-top: 3px;
  box-sizing: border-box;
  background: url('https://opgg-static.akamaized.net/images/site/summoner/bg-levelbox.png');
  background-size: 100%;
  line-height: 17px;
  font-size: 14px;
  text-align: center;
  color: #eabd56;
`;

function ProfileIcon({ borderSrc, profileSrc, level, className }: IProfileIcon): ReactElement {
  return (
    <StyledProfileIcon className={className}>
      <StyledTierBorder borderSrc={borderSrc}></StyledTierBorder>
      <img className="profile-image" src={profileSrc} alt="프로필 이미지" />
      <StyledLevelBox>{level}</StyledLevelBox>
    </StyledProfileIcon>
  );
}

export default ProfileIcon;
