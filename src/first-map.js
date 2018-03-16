const center = {
  lat: 40.7413549,
  lng: -73.9980244,
};

const mapOption = {
  center,
  zoom: 13,
};

const initMap = resolve => () => {
  const $map = document.getElementById('map');
  const map = new window.google.maps.Map($map, mapOption);
  resolve(map);
};

const promise = (resolve) => {
  // Creates a new map - only center and zoom are required.
  window.initMap = initMap(resolve);
};

export default () => new Promise(promise);
