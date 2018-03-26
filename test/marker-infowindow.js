import { expect } from 'chai';

// see a marker and an info window
require('../util/path2dom-sync')('src/marker-infowindow.html');
// resolves with a map object that should has
//  infoWindow
//    string getContent()
//    Latlng getPosition()
//  marker
//    Latlng getPosition()
//    string getTitle()
//    bool   getVisible()
// where
//  Latlng
//    number lat()
//    number lng()
const gettingMap = require('../src/marker-infowindow');

// fetch the map, network request timeout 10s
// click on the marker
async function beforeInfoWindowMarker() {
  this.timeout(1e4);
  Object.assign(this, await gettingMap);
  this.infoWindowContent = this.infoWindow.getContent();
  window.google.maps.event.trigger(this.marker, 'click');
}

// show user right info
function itInfoWindowContent() {
  const content = this.infoWindow.getContent();
  expect(content).to.equal('Latitude: 40.7, Longitude: -74.0');
}
// invisible on init
function itInfoWindowContentOld() {
  expect(this.infoWindowContent).to.be.equal();
}
// on the right marker
function itInfoWindowLatitude() {
  this.latlng = this.infoWindow.getPosition();
  const latitude = this.latlng.lat();
  expect(latitude).to.be.closeTo(40.74135, 1e-5);
}
// on the right marker
function itInfoWindowLongitude() {
  const longitude = this.latlng.lng();
  expect(longitude).to.be.closeTo(-73.99802, 1e-5);
}
// with the position given
function itMarkerLatitude() {
  this.latlng = this.marker.getPosition();
  const latitude = this.latlng.lat();
  expect(latitude).to.be.closeTo(40.74135, 1e-5);
}
// with the position given
function itMarkerLongitude() {
  const longitude = this.latlng.lng();
  expect(longitude).to.be.closeTo(-73.99802, 1e-5);
}
// has title
function itMarkerTitle() {
  const title = this.marker.getTitle();
  expect(title).to.equal('Click me please');
}
// appearing on init
function itMarkerVisible() {
  const visible = this.marker.getVisible();
  expect(visible).to.equal(true);
}

const describeInfoWindow = () => {
  it('Content "Latitude: 40.7, Longitude: -74.0"', itInfoWindowContent);
  it('Content empty at first', itInfoWindowContentOld);
  it('Latitude 40.74135', itInfoWindowLatitude);
  it('Longitude -73.99802', itInfoWindowLongitude);
};
const describeMarker = () => {
  it('Latitude 40.74135', itMarkerLatitude);
  it('Longitude -73.99802', itMarkerLongitude);
  it('Title "Click me please"', itMarkerTitle);
  it('Visible', itMarkerVisible);
};

const describeInfoWindowMarker = () => {
  before(beforeInfoWindowMarker);
  describe('Info window', describeInfoWindow);
  describe('Marker', describeMarker);
};

describe('Info window & marker', describeInfoWindowMarker);

