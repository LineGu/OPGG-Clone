import useToolTip from '@hooks/useToolTip';
import { IImageObj } from '@types';
import { TOOLTIP_CONTENT } from '@constants/tooltip';
import React from 'react';
import styled from 'styled-components';
import ImageIcon from '../commons/ImageIcon';

interface IItemListProps {
  items: IImageObj[];
}

const ItemListWrapper = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  width: 113px;
  justify-content: initial;
  align-items: center;
  .item {
    position: relative;
    display: inline-block;
    width: 22px;
    height: 22px;
    border-radius: 3px;
    margin-top: 2px;
    margin-right: 2px;
  }
`;

const ITEM_CNT = 7;

function InGameItemList({ items }: IItemListProps) {
  const ItemCntArr = new Array(ITEM_CNT).fill(0);

  return (
    <ItemListWrapper>
      {ItemCntArr.map((_, idx) => {
        const { target, tooltipEl } = useToolTip(TOOLTIP_CONTENT, 'top');
        const isWard = idx === items.length - 1;
        const isWardIdx = idx === 3;
        if (isWardIdx) idx = items.length - 1;
        if (isWard) idx = 3;
        return (
          <React.Fragment key={items[idx] ? idx + items[idx].imageUrl : idx}>
            <div className="item in-game-item-unit" ref={target}>
              {tooltipEl}
              {items[idx] ? <ImageIcon src={items[idx].imageUrl} alt="아이템" size={22} /> : null}
            </div>
          </React.Fragment>
        );
      })}
    </ItemListWrapper>
  );
}

export default InGameItemList;
