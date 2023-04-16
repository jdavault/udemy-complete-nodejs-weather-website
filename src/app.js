import express, { response } from "express";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from "hbs"
import { geocode } from "./utils/geocodes.js";
import { forecast } from "./utils/forecast.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const PORT = process.env.PORT || 3003;
dotenv.config();

// const { TEST_VALUE: testValue } = process.env;
// console.log("testValue", testValue)

//Define path for express config
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static didrector to serve static content
app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Joe Davault",
    content: "Use this site to get your weather!"
  })
})

app.get('/about', (req, res) => {
  res.render("about", {
    title: "About",
    name: "Joe Davault",
    content: "This site was created by Joe Davault.  It uses data from mapbox.com and weatherstack.com to render weather forcasts for provided cities."
  })
})

app.get('/help', (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Joe Davault",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  })
})

// app.get('/404', (req, res) => {
//   res.render("404", {
//     title: "Page Not Found",
//     name: "Joe Davault",
//     content: "The page you are looking for does not exist or is not available"
//   })
// })


// app.get('/help', (req, res) => {
//   res.send([{
//     name: 'Joe', age: 53
//   },
//   { name: 'Andrew', age: 27 }])
// })

// app.get('/about', (req, res) => {
//   res.send("<h2>This is the about page!</h2><p>At PX3, we understand that each organization is unique and requires customized solutions that address their specific challenges. Our team of experienced consultants works closely with clients to identify their needs, develop tailored strategies, and implement solutions that produce measurable results.</p><p>Our services include [list services provided, such as strategic planning, process improvement, organizational development, project management, etc.]. We have a proven track record of success, helping clients achieve their goals and maximize their potential.</p>")
// })

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "Address query string must be provided."
    })
  }
  geocode(address, (error, data) => {
    if (error) {
      return res.send({
        error
      })
    }
    const { latitude, longitude, location } = data

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }
      const { weather_descriptions, temperature, feelslike } = forecastData

      const forecast = `In ${location} today its ${weather_descriptions[0]}.  It's currently ${temperature} degrees out, but it feels like ${feelslike} degrees.`;
      //console.log(forecast)

      res.send({
        forecast,
        location,
        address: req.query.address
      })

    })
  })
})

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Search query string must be provided."
    })
  }
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render("404", {
    title: "Article Not Found",
    name: "Joe Davault",
    errorMessage: "The article you are looking for does not exist or is not available"
  })
})

app.get('*', (req, res) => {
  res.render("404", {
    title: "Page Not Found",
    name: "Joe Davault",
    errorMessage: "The page you are looking for does not exist or is not available"
  })
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})