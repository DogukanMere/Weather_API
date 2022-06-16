const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "ccdd99e95bf1e6398858d9d7b7745430";
  const unit = "metric";
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`
    )
    .then((response) => {
      console.log(response.status);
      const weatherData = response.data;
      const city = weatherData.name;
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      res.write(`<p>The weather is currently ${desc}</p>`);
      res.write(
        `<h1>The temprature in ${city} is ${temp} degrees Celcius.</h1>`
      );
      res.write(`<img src="${imageURL}">`);
      res.send();
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
