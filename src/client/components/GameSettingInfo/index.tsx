import ImageIcon from '@components/commons/ImageIcon';
import { IChampion, IImageObj } from '@types';
import React from 'react';
import styled from 'styled-components';

const SettingInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  height: 100%;
  padding-top: 15px;

  .setting-img-info-wrapper {
    display: flex;
    margin-bottom: 5px;

    & > div {
      display: flex;
      flex-direction: column;
    }

    img {
      margin-bottom: 2px;
    }
  }

  .summoner-spells {
    margin-left: 6px;
  }

  .summoner-runes {
    margin-left: 4px;
  }

  & > span {
    font-family: AppleSDGothicNeo;
    font-size: 11px;
    letter-spacing: -0.42px;
    color: #555;
  }
`;

interface GameSettingInfoProps {
  champion: IChampion;
  spells: IImageObj[];
  runes: string[];
}

const getChampNameByImg = (url: string) => url.split('/').pop()?.split('.')[0];

function GameSettingInfo({ champion, spells, runes }: GameSettingInfoProps) {
  return (
    <SettingInfoWrapper>
      <div className="setting-img-info-wrapper">
        <ImageIcon src={champion.imageUrl} alt="챔피언 이미지" size={46} shape="circle" />
        <div className="summoner-spells">
          {spells.map((spellInfo) => (
            <ImageIcon
              src={spellInfo.imageUrl}
              alt="스펠 정보"
              key={spellInfo.imageUrl}
              size={22}
            />
          ))}
        </div>
        <div className="summoner-runes">
          {runes.map((runeImg) => (
            <ImageIcon src={runeImg} alt="스펠 정보" key={runeImg} size={22} shape="circle" />
          ))}
        </div>
      </div>
      <span className="champion-name">{champion.name ?? getChampNameByImg(champion.imageUrl)}</span>
    </SettingInfoWrapper>
  );
}

export default GameSettingInfo;
