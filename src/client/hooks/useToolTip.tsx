import React from 'react';
import styled from 'styled-components';

type ToolTipPositionType = 'top' | 'bottom' | 'left' | 'right';

interface IToolTipProps {
  msg: string;
  position: ToolTipPositionType;
  visible: boolean;
}

const StyedToolTip = styled.div<{ visible: boolean }>`
  top: 0;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: absolute;
  font-family: AppleSDGothicNeo;
  font-size: 11px;
  line-height: 1.36;
  color: #fff;
  z-index: 1000;
  width: 300px;
  height: 65px;
  white-space: initial;
  padding: 10px;
  background-color: #222727;
`;

function ToolTip({ msg, position, visible }: IToolTipProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    ref.current.style[position] = '-90px';
  }, [ref]);
  return (
    <StyedToolTip ref={ref} visible={visible}>
      {msg}
    </StyedToolTip>
  );
}

function useToolTip(msg: string, position: ToolTipPositionType) {
  const target = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  const tooltipEl = <ToolTip msg={msg} position={position} visible={visible} />;

  React.useEffect(() => {
    const showTooltip = () => setVisible(true);
    const hideTooltio = () => setVisible(false);
    target.current?.addEventListener('mouseover', showTooltip);
    target.current?.addEventListener('mouseout', hideTooltio);

    return () => {
      target.current?.removeEventListener('mouseover', showTooltip);
      target.current?.removeEventListener('mouseout', hideTooltio);
    };
  }, []);

  return { target, tooltipEl };
}
export default useToolTip;
