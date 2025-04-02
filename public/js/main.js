const webS = new window.WebSocket('ws://192.168.1.204:9000')

webS.onopen = () => {
  console.log('connected!')
}
webS.onclose = () => {
  console.log('connection closed')
}

webS.onmessage = (event) => {
  console.log(event.data)
  const data = JSON.parse(event.data)
  document.querySelector('.value-t').innerText = data.temp
  document.querySelector('.value-h').innerText = data.humi
  document.querySelector('.value-p').innerText = data.press
  document.querySelector('.value-message').innerText = data.message

  document.querySelectorAll('.value-timestamp').forEach((element) => {
    element.innerText = data.timestamp
  })
  addData(chart, data.timestamp.substring(11, 19), data.temp, data.humi, data.press)
}

var ctx = document.getElementById('myChart')

const chart = new window.Chart(ctx, {
  type: 'line',
  data: {
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [],
        fill: false,
        borderColor: 'rgba(255, 0, 0, 0.8)',
      },
      {
        label: 'Humidity (%)',
        fill: false,
        borderColor: 'rgba(0, 0, 255, 0.8)',
        data: [],
      },
      {
        label: 'Pressure  (Microbars)',
        fill: false,
        borderColor: 'rgba(0, 255, 255, 0.8)',
        data: [],
      },
    ],
    labels: [],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 10,
            suggestedMax: 50,
          },
        },
      ],
    },
    fill: false,
  },
})

function addData(chart, label, tempData, humiData, pressData) {
  chart.data.labels.push(label)
  chart.data.datasets[0].data.push(tempData)
  chart.data.datasets[1].data.push(humiData)
  chart.data.datasets[2].data.push(pressData / 1000) // display in micro for better chart view

  chart.update()
}
