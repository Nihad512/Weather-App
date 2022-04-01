const apiKey="42e1ddedf9d266f82ec9787d8ebd12f4";
const button=document.getElementById('button');

function getCoords() {
    const xhttp=new XMLHttpRequest();
    const input=document.getElementById('cityName').value;
    xhttp.onload= function (){
        let myData= JSON.parse(this.response);
        console.log(myData);
    }
    xhttp.open("Get", `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${apiKey}`, true);
    xhttp.send();




} 
button.addEventListener('click',getCoords)