const $map = document.getElementById('map');
const center = {
  lat: 40.7413549,
  lng: -73.9980244,
};
const xhr = new XMLHttpRequest();

const mapOption = {
  center,
  zoom: 13,
};

const initMap = resolve => () => {
  const map = new window.google.maps.Map($map, mapOption);
  resolve(map);
};

const promise = (resolve) => {
  // Creates a new map - only center and zoom are required.
  window.initMap = initMap(resolve);

  xhr.open('GET', 'https://maps.googleapis.com/maps/api/js?key=' +
    'AIzaSyDjVfqJxzWxKX77K0E-e3Lk5kG66hsFNL8&v=3&callback=window.initMap');
  xhr.send();
};

export default () => new Promise(promise);
