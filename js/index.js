"use strict";

// de leaflet library is reeds geimporteerd, en beschikbaar als "L"
// dit via de script en css tag in de index.html, en de "map" div die werd toegevoegd.

const app = {
	map: null, // gebruik dit om de map gemakkelijk aan te spreken doorheen de applicatie
	init() {
		// initialise de kaart
		var map = L.map("map").setView([50.8455074, 4.3545161], 11);

		// voeg een tile layer toe, met URL https://a.tile.openstreetmap.org/{z}/{x}/{y}.png
		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			// vergeet openstreetmap attributie niet
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);

		// gebruik de functie "loadMarkers" om de markers toe te voegen
		L.marker([50.842239, 4.322808]).addTo(map).bindPopup("<strong>Erasmushogeschool campus Kaai</strong><br><em> MCT, TI, Musical</em>").openPopup();

		fetch("https://opendata.brussels.be/api/records/1.0/search/?dataset=toiletten&q=&rows=100&geofilter.distance=50.846475%2C+4.352793%2C+5000")
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				console.log(data);
				data.records.forEach(function (element) {
					console.log(element);
					L.marker([element.geometry.coordinates[1], element.geometry.coordinates[0]]).addTo(map).bindPopup(`${element.fields.adrvoisnl}`).openPopup();
				});
			});
	},
	loadMarkers() {
		// fetch de data van opendata.brussels.be
		// als er coordinaten beschikbaar zijn, kan je de addMarker functie gebruiken om een marker toe te voegen op de kaart
	},
	addMarker(lat, lon) {
		// voeg een marker toe op lat, lon
	},
};

app.init();
