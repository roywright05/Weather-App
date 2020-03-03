//jshint esversion: 6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const port = 6190;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {

  res.sendFile(`${__dirname}/index.html`);


});

app.post("/", (req, res)=>{

  //console.log(`Weather data for: ${city}`);
  const query = req.body.cityName;
  const appid = "d90c824c09cee686b00c31376301a718";
  const unit = "imperial";
  const url = `https://api.openweathermap.org/data/2.5/weather?units=${unit}&q=${query},us&appid=${appid}`;
  https.get(url, (response) => {

    //console.log(response.statusCode);

    response.on("data", (data) => {

      weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const cityName = weatherData.name;
      const icon = weatherData.weather[0].icon;
      const imageUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      console.log(description);

      res.write("<h1>Welcome to Daily Weather Updates </h1>");
      res.write(`<h3>Today's weather in ${cityName} is ${temperature} ºF with ${description}. </h3>`);
      res.write("<img src="+imageUrl+" />" );
      res.send();
    });
  });

});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
