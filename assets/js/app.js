const apiKey="42e1ddedf9d266f82ec9787d8ebd12f4";
const button=document.getElementById('button');
const degree=document.getElementById('degree');
const area=document.getElementById('Country');
const Wt=document.getElementById('WT');
const humid=document.getElementById('humid');
const wind=document.getElementById('wind');
const weather=document.getElementById('weather');
const center=document.getElementById('center');
const Main=document.getElementById('Main').style;
const colors={
    Clear: '#42C2FF',
    Clouds:'#A8AAC4',
    Snow:'#6BA7CC'
}
let Country='';
let lon;
let lat;
function getWeather(lat,lon){
    const xhttp=new XMLHttpRequest();
    xhttp.onload= function Name(){
    let data=JSON.parse(this.response);
    Country= Country+', ' + data.sys.country 
    area.innerText=Country;
    Country= ''
    degree.innerText=data.main.temp +'°C'
    Wt.innerText=data.weather[0].main
    humid.innerText='Humidity:'+ data.main.humidity+'%'
    wind.innerText="Wind Speed:"+data.wind.speed +'km/h'
    let test=`colors.${data.weather[0].main}`
    
    weather.src='assets/images/'+ data.weather[0].main +'.png'
    center.style.backgroundColor=eval(test)
    Main.setProperty('--background',` url(../Icons/${data.weather[0].main}.svg)`)
    }
    xhttp.open("Get",`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,true)
    xhttp.send()
}
function getCoords() {
    const xhttp=new XMLHttpRequest();
    
    const input=document.getElementById('cityName').value;
    Country=Country+input;
    xhttp.open("Get", `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${apiKey}`, true);
    xhttp.onreadystatechange= function (){
        if(xhttp.readyState===4){
            if (xhttp.status===200) {
                xhttp.onload=  function  starter (){
                    let myData= JSON.parse(this.response);
                    if (myData.length <=0 ) {
                        alert('Wrong City or another issue please contact with the developer')
                    }
                    lon=myData[0].lon
                    lat=myData[0].lat
                    getWeather(lat,lon)
                }
            }else {
                alert("Error",xhttp.statusText);
            }
        }
    }
   
    xhttp.send();
 


} 
button.addEventListener('click',getCoords)