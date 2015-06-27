		$(document).ready(function(){  
		// function initialize() {
			window.countryRestrict = {'country': 'in'}
			var countries = {
        		'in': {
          			center: new google.maps.LatLng(21, 78),
          			zoom: 6
        		},
        		'au': {
          			center: new google.maps.LatLng(-25.3, 133.8),
          			zoom: 6
        		},
        		'br': {
          			center: new google.maps.LatLng(-14.2, -51.9),
          			zoom: 3
        		},
        		'ca': {
          			center: new google.maps.LatLng(62, -110.0),
          			zoom: 3
        		},
        		'fr': {
          			center: new google.maps.LatLng(46.2, 2.2),
          			zoom: 5
        		},
        		'de': {
          			center: new google.maps.LatLng(51.2, 10.4),
          			zoom: 5
        		},
        		'mx': {
          			center: new google.maps.LatLng(23.6, -102.5),
          			zoom: 4
        		},
        		'nz': {
          			center: new google.maps.LatLng(-40.9, 174.9),
          			zoom: 5
        		},
        		'it': {
            		center: new google.maps.LatLng(41.9, 12.6),
            		zoom: 5
        		},
        		'za': {
          			center: new google.maps.LatLng(-30.6, 22.9),
          			zoom: 5
        		},
        		'es': {
          			center: new google.maps.LatLng(40.5, -3.7),
          			zoom: 5
       			},
        		'pt': {
            		center: new google.maps.LatLng(39.4, -8.2),
            		zoom: 6
        		},
        		'us': {
          			center: new google.maps.LatLng(37.1, -95.7),
          			zoom: 3
        		},
        		'uk': {
          			center: new google.maps.LatLng(54.8, -4.6),
          			zoom: 5
        		}
        	};

			autocomplete = new google.maps.places.Autocomplete((document.getElementById('address')),
        	{
          		types: ['(cities)'],
          		componentRestrictions: window.countryRestrict
        	});
        	console.log(window.countryRestrict)
        	places = new google.maps.places.PlacesService(map); 
        	google.maps.event.addListener(autocomplete, 'place_changed', function(){
        		var place = autocomplete.getPlace();
        		if (place.geometry) {
          			var lat = place.geometry.location.A;
          			var lon = place.geometry.location.F;
          			map.removeLayer(marker)
          			map.panTo(L.latLng(lat, lon));
          			marker = L.marker([lat, lon],{
          				draggable:true
          			}).addTo(map);
          			marker.on('dragend', ondragend);
					      ondragend();
                marker.on('click', function () {
                  map.zoomIn(3);
                });
          		}
        	});

        	google.maps.event.addDomListener(document.getElementById('select'), 'change', setAutocompleteCountry);

			var map = L.map('map_canvas').setView([23, 79], 5);
			var coordinates = document.getElementById('infoPanel');
			var OpenMapSurfer_Roads = L.tileLayer('http://openmapsurfer.uni-hd.de/tiles/roads/x={x}&y={y}&z={z}', {
				maxZoom: 20,
				attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}).addTo(map);
						
			map.on('click', function(e) {
    			alert("Lat : " + e.latlng.lat + ",   "  + "Lon : " + e.latlng.lng)
			});

			var marker = L.marker([23, 79],{
				draggable: true
			}).addTo(map);
			marker.on('dragend', ondragend);
			ondragend();

			function ondragend() {
    			var m = marker.getLatLng();
    			coordinates.innerHTML = 'Latitude: ' + m.lat + '<br />Longitude: ' + m.lng;
			}
			marker.on('click', function () {
    			map.zoomIn(3);
			});

		});



			function onPlaceChanged() {
        		var place = autocomplete.getPlace();
        		if (place.geometry) {
          			var latitude = place.geometry.location.A;
          			var longitude = place.geometry.location.F;
          			// console.log(latitude)
          			// console.log(longitude)
        		}
      		}

      		function search() {
        		var search = {
          			types: ['lodging']
        		};
      		}

      		function setAutocompleteCountry() {
        		var country = document.getElementById('select').value;
        		autocomplete.setComponentRestrictions({ 'country': country });
      		}

		function MyOption() {
			$('#address').val("")
			var add = document.getElementById("select");
        	// var address = add.options[add.selectedIndex].text;
       		var value = add.options[add.selectedIndex].value;  
       		console.log(value)
       		if (value) {
       			window.countryRestrict = { 'country': value }
       			console.log(window.countryRestrict)
       		}			
		}