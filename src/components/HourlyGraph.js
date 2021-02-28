/* import { AxisLeft, AxisBottom } from '@visx/axis';
import { GradientOrangeRed } from '@visx/gradient';
import { Group } from '@visx/group';
import { scaleTime, scaleLinear } from '@visx/scale';
import { AreaClosed, Bar } from '@visx/shape';
import { extent, max } from 'd3-array';

//* Variables
const width = 750;
const height = 400;
const margin = {
  top: 60,
  bottom: 60,
  left: 80,
  right: 80,
};
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;
const x = (d) => new Date(d.date); // d.date is unix timestamps
const y = (d) => d.close;

//* Component
const HourlyGraph = ({ hourly, dayTemps }) => {
  const data = hourly ? hourly : dayTemps;

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(data, y)],
  });

  //* Return statement
  return (
    <svg width={width} height={height}>
      <Group top={margin.top} left={margin.left}>
        <AreaClosed
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          fill={'red'}
        />
      </Group>{' '}
    </svg>
  );
};

export default HourlyGraph;
 */
