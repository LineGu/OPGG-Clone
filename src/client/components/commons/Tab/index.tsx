import { IChildrenComponentProps } from '@types';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface ITabList extends IChildrenComponentProps {
  tabMap: {
    [key: string]: {
      name: string;
      content: ReactElement;
    };
  };
}

const TabWrapper = styled.div`
  background-color: #ededed;
`;

const StyledTabList = styled.div`
  & > span:last-child {
    border-right: none;
  }

  & > span:first-child {
    border-left: none;
  }

  & > span:hover {
    cursor: pointer;
  }
`;

const TabContent = styled.div``;

function Tab({ tabMap, className }: ITabList) {
  const initKey = Object.keys(tabMap)[0];
  const [tabKey, setTabKey] = React.useState(initKey);

  return (
    <TabWrapper className={className}>
      <StyledTabList className="tab">
        {Object.entries(tabMap).map(([key, { name }]) => {
          return (
            <span
              onClick={() => setTabKey(key)}
              key={name}
              className={tabKey === key ? 'checked' : 'unChecked'}
            >
              {name}
            </span>
          );
        })}
      </StyledTabList>
      <TabContent className="content">{tabMap[tabKey].content}</TabContent>
    </TabWrapper>
  );
}

export default Tab;
