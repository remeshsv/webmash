

var username = "remeshsv";
var request = new XMLHttpRequest();
var addr, temp, wind, clouds;



//initMap() which initiates map to a location
function initMap() {

	//initialize map
    var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 32.75, lng: -97.13},
          scrollwheel: false,
          zoom: 17
      });


var marker = new google.maps.Marker({
          position: {lat: 32.75, lng: -97.13},
          map: map
        });

var geocoder = new google.maps.Geocoder;
var infowindow = new google.maps.InfoWindow;

    
	//Initializing a mouse click event on map which then calls reversegeocode function
    google.maps.event.addListener(map, "click", function (e) {

    var latLng = e.latLng;

    marker.setMap(null);
    marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
      
    
    reversegeocode(latLng.lat(),latLng.lng(),map, geocoder, infowindow,marker);
    
    sendRequest(latLng.lat(),latLng.lng());

    

}); 

}


// Reserse Geocoding 
function reversegeocode(latt,lngg,map, geocoder, infowindow,marker) {

        var latlng = {lat: latt, lng: lngg};
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
  
              addr = results[0].formatted_address;
            
              infowindow.setContent(results[0].formatted_address);
              infowindow.open(map, marker);
              
              var txtout=document.getElementById('output').value;
              document.getElementById('output').innerHTML=  txtout  + addr;
            
            } else {
              window.alert('No results found');
            }
            }}
            );
        
}


function displayResult () {
    if (request.readyState == 4) {
        var xml = request.responseText;
        var xmldom = (new DOMParser()).parseFromString(xml, 'text/xml');
        var temp = xmldom.getElementsByTagName("temperature")[0].childNodes[0].nodeValue;
        //alert(temp);
        //alert(addr);
        
        var wind = xmldom.getElementsByTagName("windSpeed")[0].childNodes[0].nodeValue;
        var clouds = xmldom.getElementsByTagName("clouds")[0].childNodes[0].nodeValue;
        var txt = document.getElementById("output").value;
        document.getElementById("output").innerHTML = txt + " \nTemperature: "+ temp + " ,WindSpeed: " + wind + " ,Clouds : " + clouds + "\n";

        
    }
}

function sendRequest (lat,lng) {
    
    request.open("GET"," http://api.geonames.org/findNearByWeatherXML?lat="+lat+"&lng="+lng+"&username="+username);
    //request.withCredentials = "true";
    request.onreadystatechange = displayResult;
    request.send(null);
}



function clearArea(){

document.getElementById("output").innerHTML = null;

}


