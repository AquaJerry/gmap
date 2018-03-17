// asynchronously adds an `initMap` function

// latitude & longitude
const center = {
  lat: 40.7413549,
  lng: -73.9980244,
};

// center tells where i am
// zoom tells how big the map is
const mapOption = {
  center,
  zoom: 13,
};

// accepts a resolve function that'll be called with a map just created
// returns a function that creates the map
const initMap = resolve => () => {
  const $map = document.getElementById('map');
  const map = new window.google.maps.Map($map, mapOption);
  resolve(map);
};

// accepts the resolve function
// adds an `initMap` function globally
const promise = (resolve) => {
  window.initMap = initMap(resolve);
};

// resolves with a map just created
export default new Promise(promise);
