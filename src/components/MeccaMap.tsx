import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface MeccaMapProps {
  onBack: () => void;
}

function MeccaMap({ onBack }: MeccaMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const width = 800;
    const height = 700;

    const svg = d3.select(svgRef.current);
    
    // Clear previous content
    svg.selectAll("*").remove();
    
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    // Mecca center coordinates
    const meccaCenter: [number, number] = [39.8263, 21.4225];
    
    // Create a zoomed projection centered on Mecca
    const projection = d3.geoMercator()
      .center(meccaCenter)
      .scale(100000)
      .translate([width / 2, height / 2]);

    // Famous places in Mecca with coordinates [longitude, latitude]
    const places = [
      { name: "Masjid al-Haram (Kaaba)", coordinates: [39.8263, 21.4225], type: "mosque" },
      { name: "Mount Arafat", coordinates: [39.9833, 21.3558], type: "mountain" },
      { name: "Mina", coordinates: [39.8833, 21.4167], type: "site" },
      { name: "Muzdalifah", coordinates: [39.9333, 21.4000], type: "site" },
      { name: "Jabal al-Nour (Cave of Hira)", coordinates: [39.8569, 21.4558], type: "cave" },
      { name: "Jabal Thawr", coordinates: [39.8167, 21.3833], type: "mountain" },
      { name: "Jannat al-Mu'alla Cemetery", coordinates: [39.8305, 21.4297], type: "cemetery" },
      { name: "Masjid al-Jinn", coordinates: [39.8344, 21.4339], type: "mosque" },
    ];

    // Draw background circle for the city area
    svg.append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", 250)
      .attr("fill", "#f5f5dc")
      .attr("stroke", "#d4a574")
      .attr("stroke-width", 2);

    // Color mapping for different place types
    const colorMap: { [key: string]: string } = {
      mosque: "#2e7d32",
      mountain: "#8d6e63",
      site: "#1976d2",
      cave: "#5d4037",
      cemetery: "#616161",
    };

    // Add place markers
    svg.selectAll("circle.place")
      .data(places)
      .join("circle")
      .attr("class", "place")
      .attr("cx", (d) => projection(d.coordinates as [number, number])?.[0] ?? 0)
      .attr("cy", (d) => projection(d.coordinates as [number, number])?.[1] ?? 0)
      .attr("r", (d) => d.type === "mosque" ? 8 : 6)
      .attr("fill", (d) => colorMap[d.type] || "#e74c3c")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .attr("opacity", 0)
      .transition()
      .duration(800)
      .delay((_, i) => i * 100)
      .attr("opacity", 1);

    // Add place labels
    svg.selectAll("text.place-label")
      .data(places)
      .join("text")
      .attr("class", "place-label")
      .attr("x", (d) => (projection(d.coordinates as [number, number])?.[0] ?? 0) + 12)
      .attr("y", (d) => (projection(d.coordinates as [number, number])?.[1] ?? 0) + 4)
      .text((d) => d.name)
      .attr("font-size", (d) => d.type === "mosque" ? "14px" : "12px")
      .attr("font-weight", (d) => d.type === "mosque" ? "600" : "500")
      .attr("fill", "#333")
      .style("pointer-events", "none")
      .attr("opacity", 0)
      .transition()
      .duration(800)
      .delay((_, i) => i * 100)
      .attr("opacity", 1);

  }, []);

  return (
    <div className="relative">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-10 px-4 py-2 bg-amber-700 hover:bg-amber-900 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200"
      >
        ← Back to Map
      </button>
      <svg ref={svgRef} width="100%" height="100%" />
    </div>
  );
}

export default MeccaMap;
