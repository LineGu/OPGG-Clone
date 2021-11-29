import TierTag from '@components/TierTag';
import { IChildrenComponentProps, ITierRank } from 'src/types';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface IPastTiersProps extends IChildrenComponentProps {
  previousTiers: ITierRank[];
}

const StyledTierTag = styled(TierTag)`
  margin-right: 7px;
`;

function PastTiers({ previousTiers, className }: IPastTiersProps): ReactElement {
  return (
    <div className={className}>
      {previousTiers.map((tierInfo) => {
        const { season, tier } = tierInfo;

        return <StyledTierTag season={season} tier={tier} key={season + tier} />;
      })}
    </div>
  );
}

export default PastTiers;
