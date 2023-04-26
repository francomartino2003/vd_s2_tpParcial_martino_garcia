d3.dsv(';','data/corte2.csv', d3.autoType).then(data => {

  let Canales = data;
  
  let Promedio = [];
  for(let canal of Canales){
    Simple = canal.Tiempo_Total / canal.Cantidad;
    Promedio.push({canal: canal.Canal, promedio: Simple})
  }
 
  Promedio.sort((a, b) => a.promedio - b.promedio); // ordenar de menor a mayor
  
  let minPromedio = Promedio[0].promedio;
  
  text_2 = [{"x":90, "y": "App Denuncia Vial", "text":Math.round(Promedio[0].promedio), "size":20}, {"x":139, "y": "App Denuncia Vial", "text":"hs promedio", "size":13}]


  let chart = Plot.plot({
    width: 700,
    nice:true,
    height: 400,
    marginLeft: 110,
    xAxis: {
      /* configuración del eje x */
      label: "Mes",
      configure: axis => axis.labelColor("red"),
    },
    x: {
      label: "Hs",
      grid:true,
      //tickSize: 0,
    },
    y: {
      label: "",
      domain: Promedio.map(d => d.canal),
      padding: 0.2,
      //tickSize: 0,
    },
    marks: [
      Plot.barX(Promedio, {
        x: 'promedio',
        y: 'canal',
        fill: d => d.promedio === minPromedio ? '#FFD202' : 'rgba(188, 188, 188, 0.8)'
      }),
      Plot.text(text_2, {
        x: 'x',
        y: 'y',
        text: "text",
        fontSize: 'size',
        fontWeight:700,
        fill: "rgba(255, 210, 2, 1)",
        dy: 0,
      }),
    ]
  })

  d3.select('#chart_2').append(() => chart)

  /*
  d3.select('#chart svg').selectAll('g[aria-label="y-axis tick label"] text')
  .filter(function(d) { return d == 0 })
  .style('fill', '#FFD202')
  .style('font-weight', 'bold');; */
})
