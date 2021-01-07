const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res){
   
    var querry = req.body.cityname;
    console.log(req.body.cityname);
    var url = "https://api.openweathermap.org/data/2.5/find?q=" + querry +"&units=metric&appid=5f535ef1d8ede5478d4548f622fd7559#";
       
    https.get(url,function(response){
    console.log(response.statusCode);
    
    response.on("data" ,function(data){
    const weatherdata = JSON.parse(data);
    const temp = weatherdata.list[0].main.temp;
    const weatherdesc = weatherdata.list[0].weather[0].description;
    const icon = weatherdata.list[0].weather[0].icon;
    const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    //res.write("<p>the weather is currently "+weatherdesc+ "</p>");
    //res.write("<h1>the temperature in "+ querry+" is "+ temp+ " degrees celcius.</h1>");
    //res.write("<img src=" + imgurl+">");
    //res.send();

    res.render("output", {weatherdesc: weatherdesc, querry: querry, temp: temp, imgurl: imgurl });
        })
    })

})




app.listen(3000, function() {
    console.log("server is running");
});


//


