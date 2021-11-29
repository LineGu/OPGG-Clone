import React, { ReactElement } from 'react';

interface RuleType {
  default: string;
  [threshold: string]: string;
}

function useResponsiveColor(rule: RuleType, target: number) {
  const elRef = React.useRef<HTMLElement>(null);
  const colorRule = React.useRef<RuleType>(rule);

  React.useEffect(() => {
    if (!elRef.current) return;

    let color = colorRule.current.default;
    Object.entries(rule).map(([key, value]) => {
      if (key !== 'default') {
        if (target >= parseInt(key)) color = value;
      }
    });
    elRef.current.style.color = color;
  }, [elRef.current, target]);

  return { targetEl: elRef };
}

export default useResponsiveColor;
