// adds a marker and an info window that tells you where you are

const $map = document.getElementById('map');

// latitude & longitude
const position = {
  lat: 40.74135,
  lng: -73.99802,
};

const moveInfoWindow = infoWindow => function markerClick() {
  const pos = this.getPosition();
  const content = `Latitude: ${pos.lat().toFixed(1)}, ` +
    `Longitude: ${pos.lng().toFixed(1)}`;
  infoWindow.setContent(content);
  infoWindow.setPosition(pos);
};

// accepts a resolve function that'll be called with a map just created
// returns a function that creates the map
const initMap = resolve => () => {
  const { InfoWindow, Map, Marker } = window.google.maps;
  const infoWindow = new InfoWindow();
  const clickMarker = moveInfoWindow(infoWindow);
  const map = new Map($map);
  const marker = new Marker({
    map,
    position,
    title: 'Click me please',
  });
  marker.addListener('click', clickMarker);
  resolve({ infoWindow, marker });
};

// accepts the resolve function
// adds an `initMap` function globally
const promise = (resolve) => {
  window.initMap = initMap(resolve);
};

// resolves with a map just created
module.exports = new Promise(promise);
