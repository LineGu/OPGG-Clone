import ImageIcon from '@components/commons/ImageIcon';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface IParticipantProps {
  imgSrc: string;
  summoner: string;
  emphasis?: boolean;
}

const ParticipantItemWrapper = styled.div<{ emphasis: boolean }>`
  display: flex;
  align-self: center;
  width: 80px;
  height: 18px;
  margin-left: 3px;
  text-align: left;
  font-family: AppleSDGothicNeo;
  font-size: 11px;
  letter-spacing: -0.42px;
  color: ${({ emphasis }) => (emphasis ? '#000' : '#555')};

  & > span {
    max-width: 60px;
    margin-left: 3px;
    text-overflow: ellipsis;
    overflow: hidden;

    &:hover {
      cursor: pointer;
    }
  }
`;

function ParticipantItem({ imgSrc, summoner, emphasis = false }: IParticipantProps) {
  const navigate = useNavigate();
  return (
    <ParticipantItemWrapper emphasis={emphasis} onClick={() => navigate(`/${summoner}`)}>
      <ImageIcon src={imgSrc} alt="챔피언 아이콘" shape="rect" size={16} />
      <span>{summoner}</span>
    </ParticipantItemWrapper>
  );
}

export default ParticipantItem;
