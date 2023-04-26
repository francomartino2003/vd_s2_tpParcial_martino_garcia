d3.dsv(';','data/corte1.csv', d3.autoType).then(data => {

  let area1 = data.filter(d => d.tipo_consultas == "totales");
  let area2 = data.filter(d => d.tipo_consultas == "cerradas");

  const meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  area2_text = d3.sum(area2, d => d.cant_consultas);
  area1_text = d3.sum(area1, d => d.cant_consultas);
  text_1 = [{"x":6.305, "y": 40, "text":Math.floor((area1_text-area2_text)/1000), "size":20},{"x":6.85, "y": 39.5, "text":"mil", "size":10}, {"x":6.5, "y": 37, "text":"en proceso", "size":10}];

  text_2 = [{"x":6.3, "y": 23.2, "text":Math.floor(area2_text/1000), "size":35},{"x":7.1, "y": 22, "text":"mil", "size":14}, {"x":6.5, "y": 18.8, "text":"consultas resueltas", "size":14}];

  let chart = Plot.plot({
    width: 700,
    grid:true,
    nice:true,
    color:{
      legend: false,
      range: ["rgba(255, 210, 2, 1)",  "rgba(188, 188, 188, 0.7)"]
    },
    x:{
      tickFormat: d => meses[d - 1],
      tickValues: data.map(d => d.meses),
      inset:0,
      label: "",
      
    },
    y:{
      label: "Miles de Consultas",
      ticks:[10,20,30,40,50,60],
    },
    marks: [
      Plot.areaY(area1, {
        x: 'mes',
        y: d => d.cant_consultas/1000,
        fill: 'tipo_consultas',
      }),
      Plot.areaY(area2, {
        x: 'mes',
        y: d => d.cant_consultas/1000,
        fill: 'tipo_consultas',
      }),
      Plot.text(text_1, {
        x: 'x',
        y: 'y',
        text: "text",
        fontSize: 'size',
        fontWeight:600,
        fill: 'rgba(255, 255, 255, 1)',
      }),
      Plot.text(text_2, {
        x: 'x',
        y: 'y',
        text: "text",
        fontSize: 'size',
        fontWeight:700,
        fill: "#ffffff",
      }),
    ]
  })

 
 
  d3.select('#chart_1').append(() => chart)

  
})


