import apisauce from 'apisauce';

const API_KEY = '65f1383328f7ca4860526bd05c6cec04';
// const API_KEY = '';
const time = Date.now()
const create = (baseURL = 'https://api.openweathermap.org/data/2.5') => {
  const api = apisauce.create({
    baseURL,
    timeout: 15000,
  });

  const getWeatherData = (payload) => {

    return api
      .get(
         `/forecast?lat=${payload.lat}&lon=${payload.lon}&dt=${time}&units=metric&appid=${API_KEY}`,
      )
      .then((resp) => {
        console.log(resp.data)
        if (resp.status === 200) {
          return {
            status: 1,
            result: resp.data,
          }
        } if (resp.status === 401) {
          return {
            status: 0,
            result: resp.data.message,
          }
        }
        
        else{
          return{
            status:0,
            result:resp.originalError
          }
        }
      })
  };

  return {
    getWeatherData,
  };
};

export default {
  create,
};
