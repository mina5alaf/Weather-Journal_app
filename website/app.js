//apiKey 299d044d40ed8a49de6bd8b1ceeec70a
 /* Global Variables */

let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let apikey = "&appid=299d044d40ed8a49de6bd8b1ceeec70a&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const postCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  console.log(feelings);
  getTemperature(baseURL, postCode, apikey)
    .then(function (data) {
      postDatarequest("/add", { date: newDate, temp: data.main.temp, content:feelings });
    })
    .then(function (newData) {
      updateUI();
    });
}

// GET Data from API 
const getTemperature = async (baseURL, code, apikey) => {
  const response = await fetch(baseURL + code + apikey);
  try {
    const userdata = await response.json();
    return userdata;
  } catch (error) {
    console.log("error", error);
  }
};

//POST data
const postDatarequest = async (url = "", data = {}) => {
  const Request = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await Request.json();
    return newData;
  } catch (error) {
    console.log("Error", error);
  }
};

// Update user interface
const updateUI = async () => {
  const req = await fetch('/all');
  try {
    const Data = await req.json();
    document.getElementById("date").innerHTML = Data.date;
    document.getElementById("temp").innerHTML = Data.temp;
    document.getElementById("content").innerHTML = feelings.value;
  } catch (error) {
    console.log("error", error);
  }
};
