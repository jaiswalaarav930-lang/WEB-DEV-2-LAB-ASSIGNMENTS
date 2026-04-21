const API_KEY = "c00836c7cd82caaecf54faa8100db8ea";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const city = document.getElementById("city");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");

const historyList = document.getElementById("history");
const logs = document.getElementById("logs");


function log(message){
console.log(message);
logs.textContent += message + "\n";
}


// Load history
window.onload = () => {

log("Page Loaded");

const history = JSON.parse(localStorage.getItem("history")) || [];

history.forEach(addHistory);

}


// Search button
searchBtn.addEventListener("click", () => {

const cityName = cityInput.value;

if(cityName===""){
alert("Enter city name");
return;
}

getWeather(cityName);

});


async function getWeather(cityName){

log("Function Start");

try{

log("Fetching API...");

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
);

const data = await response.json();

log("Data received");

if(data.cod !== 200){
throw new Error("Invalid city");
}

displayWeather(data);

saveHistory(cityName);

}catch(error){

log("Error Occurred");

alert("City not found or network error");

}

log("Function End");

}


function displayWeather(data){

city.textContent = "City: " + data.name;
temp.textContent = "Temp: " + data.main.temp + " °C";
condition.textContent = "Weather: " + data.weather[0].main;

}


function saveHistory(cityName){

let history = JSON.parse(localStorage.getItem("history")) || [];

if(!history.includes(cityName)){

history.push(cityName);

localStorage.setItem("history",JSON.stringify(history));

addHistory(cityName);

}

}


function addHistory(cityName){

const li = document.createElement("li");

li.textContent = cityName;

li.onclick = () => getWeather(cityName);

historyList.appendChild(li);

}


// Promise demo

fetch("https://jsonplaceholder.typicode.com/posts/1")
.then(res=>res.json())
.then(data=>{

log(".then() executed");

})
.catch(err=>{

log(".catch() error");

});