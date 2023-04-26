const mapaFetch = d3.json('data/barrios-caba.geojson')
const dataFetch = d3.dsv(';', 'data/corte3.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {

  /* Agrupamos reclamos x barrio */
  const reclamosPorBarrio = d3.group(data, d => d.barrio) // crea un Map
  
  myContinuousColors = ["#FFFFFF", "#FFD202"]

  /* Mapa Coroplético */
  let chartMap = Plot.plot({
    height: 500,
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    color: {
      // Quantize continuo (cant. denuncias) -> discreto (cant. colores)
      type: 'linear', // Utilizamos una escala secuencial personalizada
      range: myContinuousColors,
      domain: [55,95],
      label: '% de consultas resueltas',
      legend: true,
    },
    marks: [
      Plot.geo(barrios, {
        fill: d => {
          let nombreBarrio = d.properties.BARRIO;
          let cantReclamos = reclamosPorBarrio.get(nombreBarrio)[0]["cant_consultas"];
          let cantResueltos = reclamosPorBarrio.get(nombreBarrio)[1]["cant_consultas"];
          return ((cantResueltos/cantReclamos)*100).toFixed(1);
        },
        stroke: "rgba(188, 188, 188, 0.7)",
        title: d => {
          let nombreBarrio = d.properties.BARRIO;
          let cantReclamos = reclamosPorBarrio.get(nombreBarrio)[0]["cant_consultas"];
          let cantResueltos = reclamosPorBarrio.get(nombreBarrio)[1]["cant_consultas"];
          let porcentaje = ((cantResueltos/cantReclamos)*100).toFixed(1);
          return`${nombreBarrio}\n${porcentaje}% de consultas resueltas`},
      }),
      Plot.text(barrios.features,
        Plot.centroid({
          text: d => {
            let nombreBarrio = d.properties.BARRIO;
            let cantReclamos = reclamosPorBarrio.get(nombreBarrio)[0]["cant_consultas"];
            let cantResueltos = reclamosPorBarrio.get(nombreBarrio)[1]["cant_consultas"];
            let porcentaje = ((cantResueltos/cantReclamos)*100).toFixed(1);
            let max_min = nombreBarrio == 'PUERTO MADERO' ? 'máxima' : 'mínima'
            return `${nombreBarrio}\n${porcentaje}% - ${max_min} prop.`
          },
          fill: "rgba(188, 188, 188, 1)",
          fontWeight:700,
          textAnchor: "start",
          dx: 29.5,
          dy:16,
          lineHeight: 1.2,
          filter: (d) => d.properties.BARRIO == 'PUERTO MADERO' || d.properties.BARRIO == 'VILLA RIACHUELO'
        })
      ),
      Plot.text(barrios.features,
        Plot.centroid({
          text: d => {return `-------------`},
          fill: "rgba(188, 188, 188, 1)",
          fontWeight:700,
          textAnchor: "center",
          dx: 0,
          dy:10,
          filter: (d) => d.properties.BARRIO == 'PUERTO MADERO' || d.properties.BARRIO == 'VILLA RIACHUELO'
        })
      )
    ],
  })


  /* Agregamos al DOM la visualización chartMap */
  d3.select('#chart_3').append(() => chartMap)

  let a = d3.select('#chart_3 figure').selectAll('svg')['_groups'][0][0];
  a.classList.add("margen_inf");
  let b = d3.select('#chart_3 figure').selectAll('svg')['_groups'][0][1];
  var elementosG = b.querySelectorAll("g");
  elementosG[0].setAttribute("transform", "translate(-25, 0)");

  
})
