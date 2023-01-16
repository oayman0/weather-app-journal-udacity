// Personal API Key for OpenWeatherMap API
const apiKey = '7a50ff7a26ff4cccdd2828fb3ef74066&units=imperial';

/* Global Variables */
const baseURL= 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();

// async function, a GET request to the OpenWeatherMap API
const getWeather = async (baseURL,zipCode,apiKey)=>{
    const res = await fetch(baseURL+zipCode+apiKey)
    try {
      const data = await res.json();
      console.log('Weather API, done');
      console.log(data);
      return data;
    }  catch(error) {
      console.log("error", error);
    }
  }

//Event listener for the generate button
document.getElementById('generate').addEventListener('click', performAction);

//Callback function for the event listener
function performAction(){
  const zipCode =  document.getElementById('zip').value+",us&appid=";
  const feelings =  document.getElementById('feelings').value;

  getWeather(baseURL,zipCode,apiKey)

  .then(function(data){
    postData('/add', {temperature:data.main.temp, date:newDate, userResponse:feelings, city:data.name} );
  })
  .then(()=>{
    retrieveData()}
  )
}

// Async function, a POST request to the app endpoint
const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },       
      body: JSON.stringify(data), 
    });
      try {
        const newData = await response.json();
        console.log('data posted to app');
        return newData;
      }
      catch(error) {
      console.log("error", error);
      }
  }

//async function to retrieve data from app endpoint and update the UI Dynamically
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    const allData = await request.json()
    console.log('data retrieved');
    console.log(allData);

    document.getElementById("date").innerHTML ="Date: "+allData.date;
    document.getElementById('city').innerHTML = "City: "+allData.city;
    document.getElementById('temp').innerHTML = 'Temperature: '+Math.round(allData.temperature)+ ' °F';
    document.getElementById('content').innerHTML = allData.userResponse;
    }
    catch(error) {
      console.log("error", error);
    }
   }