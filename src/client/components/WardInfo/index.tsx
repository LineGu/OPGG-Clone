import ImageIcon from '@components/commons/ImageIcon';
import { IWard } from '@types';
import React from 'react';
import styled from 'styled-components';

interface WardInfoProps {
  wardInfo: IWard;
  isWin: boolean;
}

const WardInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #353a3a;
  line-height: 13px;
  font-size: 11px;
  text-align: center;
  margin-left: 14px;

  & > span {
    margin: 2px 0 0 4px;
  }
`;

const WIN_WARD_IMG = 'https://opgg-static.akamaized.net/images/site/summoner/icon-ward-blue.png';
const LOSS_WARD_IMG = 'https://opgg-static.akamaized.net/images/site/summoner/icon-ward-red.png';

function WardInfo({ wardInfo, isWin }: WardInfoProps) {
  return (
    <WardInfoWrapper>
      <ImageIcon src={isWin ? WIN_WARD_IMG : LOSS_WARD_IMG} size={16} alt="와드" />
      <span>제어 와드 {wardInfo.visionWardsBought}</span>
    </WardInfoWrapper>
  );
}

export default WardInfo;
