let monToken = 'pk.eyJ1IjoiZmxvcmlhbi1mbG9jb24iLCJhIjoiY2tldjJ1a3A5NDB1ZTJzcGNpOGJ1OTRxcSJ9.kFHGE_fRa8nxG2UN7DAaNA';
let mymap;
let markers;

if ("geolocation" in navigator) {
    
    navigator.geolocation.getCurrentPosition(showMyMapWithMyPosition);

} else {
    
    window.alert("METTEZ A JOUR VOTRE NAVIGATEUR !!!!!!!!!");
}    


function showMyMapWithMyPosition(position)  {
    
    createMap(position.coords.latitude, position.coords.longitude)
   
    $("#search").removeClass('hide');
    
    $('#search').on('submit', function(e) {
        
        e.preventDefault();
       
        getBusinessNearMyPosition(position.coords.latitude, position.coords.longitude);
    })
}


function getBusinessNearMyPosition(lat, lng) {

    let keyword = $('#business').val();
   
    markers.clearLayers();
    
    fetch('https://nominatim.openstreetmap.org/search?q='+keyword+' '+lat+','+lng+'&format=geocodejson')

    .then(response => response.json())
 
    .then((places) => {
   
    places.features.map((place, index)=>{ 
     
        let marker = L.marker([place.geometry.coordinates[1], place.geometry.coordinates[0]]).addTo(mymap);
    
        let popupContent = '<p>'+place.properties.geocoding.label+'</p>';
        
        marker.bindPopup(popupContent);     
      
        markers.addLayer(marker);
        })
    })
    .catch(err => console.log(err, "Echec de la requète!"))
}


function createMap(lat, lng) {
     
    mymap = L.map('mapid').setView([lat, lng], 13);
    
    markers= L.layerGroup().addTo(mymap);
   
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: monToken,
    }).addTo(mymap);
   
    let myIcon = L.icon({
        iconUrl: 'img/bluecircle.png',
        iconSize: [10, 10],
    });
  
    let marker = L.marker([lat, lng], {icon: myIcon}).addTo(mymap);
}