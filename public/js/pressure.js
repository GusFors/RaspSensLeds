const webS = new window.WebSocket('ws://192.168.1.204:9000/properties')

webS.onopen = () => {
  console.log('connected!')
}
webS.onclose = () => {
  console.log('connection closed')
}

webS.onmessage = (event) => {
  console.log(event.data)
  const data = JSON.parse(event.data)
  document.querySelector('.value').innerText = 'Value: ' + data.press
  document.querySelector('.timestamp').innerText = 'Timestamp: ' + data.timestamp
  addData(chart, data.timestamp.substring(11, 19).substring(0, 9), data.press)
}

var ctx = document.getElementById('myChart')

const chart = new window.Chart(ctx, {
  type: 'line',
  data: {
    datasets: [
      {
        label: 'Pressure (millibars)',
        data: [],
        fill: false,
        borderColor: 'rgba(0, 255, 255, 0.8)',
      },
    ],
    labels: [],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 500,
            suggestedMax: 1300,
          },
        },
      ],
    },
    fill: false,
  },
})

function addData(chart, label, pressData) {
  chart.data.labels.push(label)
  chart.data.datasets[0].data.push(pressData)

  chart.update()
}
