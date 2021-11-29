import React from 'react';
import DonutChart from 'react-donut-chart';

function DonutChartElem({ data, colors, height = 90, width = 90 }) {
  React.useEffect(() => {
    document.querySelectorAll('.donutchart-arcs > path').forEach((el) => {
      (el as HTMLElement).style.opacity = '1';
    });
  }, []);

  return (
    <DonutChart
      data={data}
      height={height}
      width={width}
      clickToggle={false}
      legend={false}
      colors={colors}
      strokeColor={'none'}
    />
  );
}

export default DonutChartElem;
