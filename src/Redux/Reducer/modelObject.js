import moment from 'moment';
function filterData(data) {
  let array = [];
  for (var i = 0; i < data.length; i += 8) {
    let requiredObject = getDaysData(data[i]);
    array.push(requiredObject);
  }
  return array;
}

function getDaysData(data) {
  let object = {
    dt: data.dt,
    dt_txt: data.dt_txt,
    day: moment(data.dt_txt).format('dddd'),
    date: moment(data.dt_txt).format('MMM Do YY'),
    weather: data.weather,
    wind: data.wind,
    main: data.main,
    // temp: calculateTmp(data.main.temp),
  };
  return object;
}

// function calculateTmp(value) {
//   console.log(value)
//   // let c = parseFloat(value);
//   // var f = (c * 9) / 5 + 32;

//   // var r = Math.round(f * 100) / 100;
//   // let temperature = r.toString();
//   // return parseFloat(temperature.toFixed(1))
//   return 0
// }

module.exports = {
  filterData,
};
