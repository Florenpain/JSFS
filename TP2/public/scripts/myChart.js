const nbValues = 12;
const defaultValue = 1;
const MIN_VALUE = 0;
const MAX_VALUE = 10;

const defaultArray = new Array(nbValues).fill(defaultValue);
const allLabels = new Array(nbValues).fill(defaultValue).map( (_,i) => String.fromCharCode('A'.charCodeAt(0)+i));

// l'objet Chart
let myChart;

const setup = () => {
  const context = document.getElementById('myChart').getContext('2d');

  myChart = new Chart(context, {
    type: 'bar',
    data: {
        labels: allLabels,
        datasets: [{
            label : `mes ${nbValues} dernières données`,
            data :  defaultArray,
            backgroundColor: 'rgba(128,255,128,0.5)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
              min: MIN_VALUE,
              max: MAX_VALUE
            }
      }
    }
  });
}


const socket = io();
socket.on('welcome', () => console.log('connection with server confirmed') );
socket.on('random', randomValue => {
  console.log(randomValue) ;
  let lastlettre=allLabels.pop();
  allLabels.unshift(lastlettre);
  defaultArray.pop();
  defaultArray.unshift(randomValue);
  myChart.update();
}) ;

socket.on('new user', (userName) => console.log('new connection from'+ userName) );

//setInterval(() => socket.emit('random'), 2000); // Version où un nombre différent est envoyé à chaque client

window.setTimeout(() => socket.emit('greatings'), 2000);

window.addEventListener('DOMContentLoaded', setup);
