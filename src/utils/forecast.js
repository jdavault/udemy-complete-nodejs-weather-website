import request from "request"

export const forecast = (latitude, longitude, callback) => {
  const query = encodeURIComponent(`${latitude},${longitude}`)

  // const params = new URLSearchParams({
  //   access_key: '9bec4d4438df5ceb779ef43f3d1c8c0b',
  //   query: '33.4484,-112.0740',
  //   units: 'f'
  // })

  //const url = "http://api.weatherstack.com/current?" + params
  const url = `http://api.weatherstack.com/current?access_key=9bec4d4438df5ceb779ef43f3d1c8c0b&query=${query}&units=f`

  const requestOptions = {
    url,
    json: true
  }

  const requestCallBack = (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", null)
    } else if (body.error) {
      const { error } = body
      const { code, info } = error
      callback(`There was an error connecting to the weather service.  Error code: ${code}, Error Message: ${info}.`, null)
    } else {
      const { temperature, feelslike, weather_descriptions, humidity } = body.current
      const data = {
        temperature,
        feelslike,
        weather_descriptions,
        humidity
      }
      callback(undefined, data)
    }
  }

  //Call to get weather info
  request(requestOptions, requestCallBack)

}