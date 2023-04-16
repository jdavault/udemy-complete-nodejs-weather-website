const getWeatherInfo = (location = "Phoneix") => {
  const url = `/weather?address=${location}`
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
          successMessage.textContent = data.location
          successMessage2.textContent = data.forecast
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
const successMessage2 = document.querySelector('#success2');
const errorMessage = document.querySelector('#error');

successMessage.textContent = ""
errorMessage.textContent = ""

console.log("search", search.value)
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  getWeatherInfo(location)
})
