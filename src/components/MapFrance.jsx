import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import departements from '../data/departements.json';

export default function MapFrance() {
  const wrapperRef = useRef(null);
  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: '' });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const svg = d3.select(svgRef.current);

    const resize = () => {
      const { width } = wrapper.getBoundingClientRect();
      const height = Math.max(420, Math.round(width * 0.7));

      // Dimensions + cadrage constant du SVG
      svg.attr('width', width).attr('height', height);
      svg.attr('viewBox', `0 0 ${width} ${height}`);
      svg.attr('preserveAspectRatio', 'xMidYMid meet');

      draw(width, height);
    };

    const draw = (width, height) => {
      svg.selectAll('*').remove();

      // Projection cadrée sur TOUT le GeoJSON (toujours visible)
      const projection = d3.geoConicConformal()
        .parallels([46, 49])
        .rotate([-3, 0])
        .fitSize([width, height], departements);

      const path = d3.geoPath().projection(projection);

      // Groupe racine (sans transform, pas de zoom/pan)
      const g = svg.append('g');

      // Palette simple (catégorielle)
      const codes = departements.features.map(f => f.properties.code);
      const color = d3.scaleOrdinal().domain(codes).range(d3.schemeTableau10);

      g.selectAll('path')
        .data(departements.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', d => color(d.properties.code))
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.8)
        .on('mousemove', (event, d) => {
          // coordonnées relatives au SVG pour positionner le tooltip
          const [x, y] = d3.pointer(event, svg.node());
          setTooltip({
            visible: true,
            x: x + 12,
            y: y + 12,
            text: `${d.properties.nom} (${d.properties.code})`,
          });
        })
        .on('mouseleave', () => setTooltip(t => ({ ...t, visible: false })));
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);
    resize();

    return () => ro.disconnect();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Carte de France intéractive</h1>
      {/* <p style={{ color: '#666' }}>La carte reste toujours entièrement visible et s’adapte à la largeur.</p> */}

      <div
        ref={wrapperRef}
        style={{ width: '100%', maxWidth: 1000, margin: '0 auto', position: 'relative' }}
      >
        <svg
          ref={svgRef}
          style={{ display: 'block', width: '100%', height: 'auto', background: '#f9fafb',
                   borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
        />
        {tooltip.visible && (
          <div
            style={{
              position: 'absolute',
              left: tooltip.x,
              top: tooltip.y,
              background: 'rgba(0,0,0,0.75)',
              color: '#fff',
              padding: '6px 8px',
              borderRadius: 6,
              pointerEvents: 'none',
              fontSize: 13,
              transform: 'translate(-50%, -120%)',
            }}
          >
            {tooltip.text}
          </div>
        )}
      </div>
    </div>
  );
}
