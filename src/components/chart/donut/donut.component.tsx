import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './donut.component.scss';

const data = [
  {
    name: 'Rare',
    percentage: 20, // percentage
    value: 80, // millions
    color: 'hsla(208, 98%, 50%, 0.4)',
  },
  {
    name: 'Exotic',
    percentage: 35,
    value: 140,
    color: 'hsla(45, 100%, 50%, 0.4)',
  },
  {
    name: 'Common',
    percentage: 10,
    value: 40,
    color: 'hsla(0, 0%, 77%, 0.4)',
  },
  /*
  {
    name: 'Foundation',
    percentage: 10,
    value: 120,
    color: '#A6A8F8',
  },
  {
    name: 'Option pool',
    percentage: 12.5,
    value: 50,
    color: '#47D7A8',
  },
  {
    name: 'Team Tokens',
    percentage: 12.5,
    value: 50,
    color: '#3BCB60',
  },
  */
];

interface DefaultDonutProps {
  name: string;
  value: string;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  data?: DefaultDonutProps | { [key: string]: any };
  width?: string;
  height?: string;
  stroke?: number;
  margin?: number;
  style?: Record<string, any>;
}

export const ChartDonut = ({ width = '100%', height = '100%', stroke = 10, margin = 20, style = {} }: Props) => {
  const selection = useRef<d3.Selection<SVGSVGElement | null, unknown, null, undefined> | null>(null);
  const svg = useRef<SVGSVGElement | null>(null);
  const variables = useRef<Record<string, any>>({});

  useEffect(() => {
    selection.current = d3.select(svg.current);
    setSvg();
    // TODO: remove below
    data;
    stroke;
  }, []);

  const setSvg = () => {
    if (selection.current) {
      variables.current.style = svg.current ? getComputedStyle(svg.current) : null;
      variables.current.width = parseFloat(variables.current.style.width) - margin * 2;
      variables.current.height = parseFloat(variables.current.style.height) - margin * 2;
      variables.current.radius = Math.min(parseFloat(variables.current.width), parseFloat(variables.current.height)) / 2;
      console.log('radius: ', variables.current.radius);
      const group: d3.Selection<SVGGElement, unknown, null, undefined> = groupCreate(selection.current);
      const groupDefault: d3.Selection<SVGGElement, unknown, null, undefined> = groupDefaultCreate(group);
      setGroupDefault(groupDefault);
      createArc(group);
      draw(groupDefault);
    }
  };

  const groupCreate = (element: d3.Selection<SVGSVGElement | null, unknown, null, undefined>) => element.append('g').attr('transform', `translate(${margin} ${margin})`);
  const groupDefaultCreate = (element: d3.Selection<SVGGElement, unknown, null, undefined>) =>
    element.append('g').attr('transform', `translate(${variables.current.width / 2} ${variables.current.height / 2})`);
  const createArc = (group: d3.Selection<SVGGElement, unknown, null, undefined>) => {
    const pie = d3
      .pie()
      .sort(null)
      .padAngle(0.12)
      .value((d: any) => d.value);

    const arc = d3.arc().innerRadius(variables.current.radius).outerRadius(variables.current.radius);

    const groupArcs = group.append('g').attr('transform', `translate(${variables.current.width / 2} ${variables.current.height / 2})`);

    const groupsArcs = groupArcs
      .selectAll('g')
      .data(pie(data as any))
      .enter()
      .append('g');

    // include the arcs specifying the stroke with the same width of the circle element
    groupsArcs
      .append('path')
      .attr('d', arc as any)
      .attr('fill', 'none')
      .attr('stroke', (d: any) => d.data.color)
      .attr('stroke-width', stroke * 0.8)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      // hide the segments by applying a stroke-dasharray/stroke-dashoffset equal to the circle circumference
      // ! the length of the element varies, and it considered afterwords
      // for certain the paths are less than the circumference of the entire circle
      .attr('stroke-dasharray', variables.current.radius * 3.14 * 2)
      .attr('stroke-dashoffset', variables.current.radius * 3.14 * 2);

    // include line elements visually connecting the text labels with the arcs
    groupsArcs
      .append('line')
      .attr('x1', 0)
      .attr('x2', (d: any) => {
        const [x] = arc.centroid(d);
        return x > 0 ? '25' : '-25';
      })
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke', ({ data: d }) => (d as any).color)
      .attr('stroke-width', 1.5)
      .attr('transform', (d: any) => {
        const [x, y] = arc.centroid(d);
        const offset = x > 0 ? 20 : -20;
        return `translate(${x + offset} ${y})`;
      })
      .attr('stroke-dasharray', 25)
      .attr('stroke-dashoffset', 25);

    // include text elements associated with the arcs
    groupsArcs
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', 8)
      .attr('text-anchor', (d: any) => {
        const [x] = arc.centroid(d);
        return x > 0 ? 'start' : 'end';
      })
      .attr('transform', (d: any) => {
        const [x, y] = arc.centroid(d);
        const offset = x > 0 ? 50 : -50;
        return `translate(${x + offset} ${y})`;
      })
      .html(
        ({ data: d }) => `
    <tspan x="0">${(d as any).name}</tspan><tspan x="0" dy="10" font-size="8">${(d as any).percentage}% / ${(d as any).value}M</tspan>
  `,
      )
      .style('opacity', 0)
      .style('visibility', 'hidden');
  };
  const setGroupDefault = (groupDefault: d3.Selection<SVGGElement, unknown, null, undefined>) => {
    groupDefault
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', variables.current.radius)
      .attr('transform', 'rotate(-90)')
      .attr('fill', 'none')
      .attr('stroke', 'hsla(0, 0%, 77%, 0.1)')
      .attr('stroke-width', stroke - 13)
      .attr('stroke-linecap', 'round')
      // hide the stroke of the circle using the radius
      // this to compute the circumference of the shape
      .attr('stroke-dasharray', variables.current.radius * 3.14 * 2)
      .attr('stroke-dashoffset', variables.current.radius * 3.14 * 2);
  };
  const draw = (groupDefault: d3.Selection<SVGGElement, unknown, null, undefined>) => {
    groupDefault
      .select('circle')
      .transition()
      .ease(d3.easeExp)
      .delay(200)
      .duration(2000)
      .attr('stroke-dashoffset', '0')
      // once the transition is complete
      // draw the smaller strokes one after the other
      .on('end', () => {
        // immediately set the stroke-dasharray and stroke-dashoffset properties to match the length of the path elements
        // using vanilla JavaScript
        const paths = document.querySelectorAll('svg g g path');
        paths.forEach((path: any) => {
          const length = path.getTotalLength();
          path.setAttribute('stroke-dasharray', length);
          path.setAttribute('stroke-dashoffset', length);
        });

        const duration = 1000;
        // transition the path elements to stroke-dashoffset 0
        d3.selectAll('svg g g path')
          .transition()
          .ease(d3.easeLinear)
          .delay((_d, i) => i * duration)
          .duration(duration)
          .attr('stroke-dashoffset', 0);

        // transition the line elements elements to stroke-dashoffset 0
        d3.selectAll('svg g g line')
          .transition()
          .ease(d3.easeLinear)
          .delay((_d, i) => i * duration + duration / 2.5)
          .duration(duration / 3)
          .attr('stroke-dashoffset', 0);

        // transition the text elements to opacity 1 and visibility visible
        d3.selectAll('svg g g text')
          .transition()
          .ease(d3.easeLinear)
          .delay((_d, i) => i * duration + duration / 2)
          .duration(duration / 2)
          .style('opacity', 1)
          .style('fill', 'white')
          .style('font-size', '12px')
          .style('visibility', 'visible');
      });
  };

  return (
    <>
      <Box style={{ width, height, ...style }} className="donut-chart">
        <svg ref={svg} width="100%" height="100%" />
      </Box>
    </>
  );
};
