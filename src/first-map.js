let callback = () => {};
const center = {
  lat: 40.7413549,
  lng: -73.9980244,
};

const mapOption = {
  center,
  zoom: 13,
};

window.initMap = () => {
  const $map = document.getElementById('map');
  // Creates a new map - only center and zoom are required.
  const map = new window.google.maps.Map($map, mapOption);
  callback(map);
};

export default (cb) => {
  if (typeof cb === 'function') callback = cb;
};
