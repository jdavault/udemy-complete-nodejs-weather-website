import request from "request"

export const geocode = (address, callback) => {
  address = encodeURIComponent(address)
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiamRhdmF1bHQiLCJhIjoiY2tucnVjajhnMGFyNDJubWtnM3VpbW8ybSJ9.glf5T3ut9oZBFVEyQWZAUg&limit=1`

  const webRequestOptions = {
    url: geocodeUrl,
    json: true
  }

  const webBoxCallBack = (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", null)
    } else if (body.features?.length === 0 || body.message === "Not Found") {
      callback("No map data found", null)
    }
    else {
      const { center, place_name } = body.features[0];
      const longitude = center[0];
      const latitude = center[1];

      const data = {
        latitude,
        longitude,
        location: place_name
      }
      callback(undefined, data)
    }
  }
  request(webRequestOptions, webBoxCallBack)
}
