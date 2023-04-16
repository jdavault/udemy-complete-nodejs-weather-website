const getWeatherInfo = (location = "Phoneix") => {
  const url = `http://localhost:3003/weather?address=${location}`
  errorMessage.textContent = "Loading...."
  fetch(url).then((response) => {
    console.log(response)
    if (response.ok) {
      response.json().then((data) => {
        if (data.error) {
          console.log("Error: ", data.error)
          successMessage.textContent = ""
          errorMessage.textContent = data.error
        } else {
          // console.log("Location: ", data.location)
          // console.log("Forcast: ", data.forecast)
          successMessage.textContent = `In ${data.location} ${data.forecast}`
          errorMessage.textContent = ""
        }
      })
    } else {
      console.log("Error")
      successMessage.textContent = ""
      errorMessage.textContent = "Somehing went wrong"
    }
  })
}

//getWeatherInfo("Boston")

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const successMessage = document.querySelector('#success');
const errorMessage = document.querySelector('#error');

successMessage.textContent = ""
errorMessage.textContent = ""

console.log("search", search.value)
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  getWeatherInfo(location)
})
