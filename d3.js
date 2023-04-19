// generate 100 random points within a 500x500 svg canvas
const data = d3.range(100).map(() => [Math.random() * 500, Math.random() * 500]);

// create a scatter plot using d3
const svg1 = d3.select("svg:nth-of-type(1)");
svg1.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => d[0])
    .attr("cy", d => d[1])
    .attr("r", 5)
    .attr("fill", "blue");

      // load the titanic.csv dataset
      d3.csv("titanic.csv").then(data => {
        // compute the age distribution
        const ageCounts = d3.rollup(data, v => v.length, d => Math.floor(d.Age / 10) * 10);
        const ageData = Array.from(ageCounts, ([age, count]) => ({ age: age.toString(), count }));

        // create a pie chart of the age distribution
        const width = 500;
        const height = 500;
        const radius = Math.min(width, height) / 2 - 10;

        const svg2 = d3.select("svg:nth-of-type(2)");
        const pie = d3.pie().value(d => d.count);
        const arc = d3.arc().innerRadius(0).outerRadius(radius);
        const colors = d3.scaleOrdinal(d3.schemeCategory10);

        svg2.append("g")
          .attr("transform", `translate(${width / 2}, ${height / 2})`)
          .selectAll("path")
          .data(pie(ageData))
          .join("path")
          .attr("d", arc)
          .attr("fill", d => colors(d.data.age))
          .attr("stroke", "white")
          .attr("stroke-width", 1);
      }
      );

