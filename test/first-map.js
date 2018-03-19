import { expect } from 'chai';

// see first map
require('../util/path2dom-sync')('src/first-map.html');
// resolves with a map model that should implement following interfaces:
//   LatLng      getCenter()
//   HTMLElement getDiv()
//   Number      getZoom()
const gettingMap = require('../src/first-map');

const itGettingMap = () => {
  expect(gettingMap).to.be.a('promise');
};
const itInitMap = () => {
  expect(window.initMap).to.be.a('function');
};
function itLatitude() {
  this.latlng = this.map.getCenter();
  const lat = this.latlng.lat();
  expect(lat).to.be.within(40.7413548, 40.741355);
}
function itLongitude() {
  const lng = this.latlng.lng();
  expect(lng).to.be.within(-73.9980245, -73.9980243);
}
// network request timeout 10s
async function itMap() {
  this.timeout(1e4);
  this.map = await gettingMap;
  expect(this.map).to.be.an('object');
}
function itViewEmpty() {
  const div = this.map.getDiv();
  expect(div).to.have.property('children').that.has.property(0);
}
function itZoom() {
  const zoom = this.map.getZoom();
  expect(zoom).to.equal(13);
}

const describeMap = () => {
  it('initMap is function', itInitMap);
  it('export is promise', itGettingMap);
  it('export resolves map object', itMap);
  it('Zoom 13', itZoom);
  it('Latitude  40.7413549', itLatitude);
  it('Longitude -73.9980244', itLongitude);
  it('View not empty', itViewEmpty);
};

describe('first map', describeMap);
