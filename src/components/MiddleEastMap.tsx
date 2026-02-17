import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import worldData from "world-atlas/countries-110m.json";
import kaabaIcon from "../assets/kaaba.svg";

interface MapProps {
  startJourney: boolean;
  onCityClick: (cityName: string) => void;
}

function Map({ startJourney, onCityClick }: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const width = 800;
    const height = 760;

    const svg = d3.select(svgRef.current);
    
    // Clear previous content
    svg.selectAll("*").remove();
    
    svg.attr("viewBox", `0 0 ${width} ${height}`);
    // Convert TopoJSON to GeoJSON
    const geoData = feature(
      worldData as unknown as Topology,
      (worldData as any).objects.countries
    );

    // Filter for Middle East countries 
    const middleEastNames = [
       "Israel", "Jordan", "Lebanon", "Syria",
      "Iraq", "Saudi Arabia", "United Arab Emirates",
      "Qatar", "Bahrain", "Kuwait", "Oman",
      "Yemen", "Palestine"
    ];

    const middleEastCountries = (geoData as any).features.filter((d: any) =>
      middleEastNames.includes(d.properties.name)
    );

    // Create projection that fits the selected region
    const projection = d3.geoMercator();
    projection.fitSize([width, height], {
      type: "FeatureCollection",
      features: middleEastCountries
    });

    const path = d3.geoPath().projection(projection);

    // Draw countries
    svg.selectAll("path")
      .data(middleEastCountries)
      .join("path")
      .attr("d", (d) => path(d as any))
      .attr("fill", startJourney ? "#e6c48a": "#000");

    // Define cities/regions with coordinates [longitude, latitude]
    const cities = [
      { name: "Mecca", coordinates: [39.8263, 21.4225] },
      { name: "Madinah", coordinates: [39.6142, 24.4672] },
      // { name: "Jerusalem", coordinates: [35.2163, 31.7683] },
      // { name: "Damascus", coordinates: [36.2765, 33.5138] },
      // { name: "Baghdad", coordinates: [44.3661, 33.3152] },
      // { name: "Riyadh", coordinates: [46.6753, 24.7136] },
      // { name: "Dubai", coordinates: [55.2708, 25.2048] },
      // { name: "Sana'a", coordinates: [44.2075, 15.3694] },
    ];

    // // Add city markers
    // svg.selectAll("circle.city")
    //   .data(cities)
    //   .join("circle")
    //   .attr("class", "city")
    //   .attr("cx", (d) => projection(d.coordinates as [number, number])?.[0] ?? 0)
    //   .attr("cy", (d) => projection(d.coordinates as [number, number])?.[1] ?? 0)
    //   .attr("r", 4)
    //   .attr("colo","#fff")
    //   .attr("fill", "#d32f2f")
    //   .attr("stroke", "#fff")
    //   .attr("stroke-width", 1.5)
    //   .style("cursor", "pointer");

    // Add Kaaba icon at Mecca
    const meccaCoords: [number, number] = [39.8263, 21.4225];
    const meccaProjected = projection(meccaCoords);
    
    if (meccaProjected) {
      svg.append("image")
        .attr("href", kaabaIcon)
        .attr("x", meccaProjected[0] - 10)
        .attr("y", meccaProjected[1] - 9)
        .attr("width", 18)
        .attr("height", 18)
        .style("cursor", "pointer")
        .on("click", () => {
          onCityClick("Mecca");
        });
    }


    // Add city labels
    svg.selectAll("text.city-label")
      .data(cities)
      .join("text")
      .attr("class", "city-label")
      .attr("x", (d) => (projection(d.coordinates as [number, number])?.[0] ?? 0) + 8)
      .attr("y", (d) => (projection(d.coordinates as [number, number])?.[1] ?? 0) + 4)
      .text((d) => d.name)
      .attr("font-size", "12px")
      .attr("font-weight", "500")
      .attr("fill", startJourney? "#333" : "#000")
      .style("pointer-events", "none");

  }, [startJourney, onCityClick]);

  return <svg ref={svgRef} width="100%" height="100%" />;
}

export default Map;
