import 'jsdom-global/register';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import firstMap from '../src/first-map';

const firstMapBefore = map => () => {
  const latlng = map.getCenter();
  this.lat = latlng.lat();
  this.lng = latlng.lng();
  this.div = map.getDiv();
  this.zoom = map.getZoom();
};
function testLatitude() {
  expect(this.lat).to.equal(40.7413549);
}
function testLongitude() {
  expect(this.lng).to.equal(-73.9980244);
}
function testViewEmpty() {
  expect(this.div).to.have.property('children').that.has.property(0);
}
function testZoom() {
  expect(this.zoom).to.equal(13);
}

const testFirstMap = map => () => {
  const myFirstMapBefore = firstMapBefore(map);
  before(myFirstMapBefore);
  it('Zoom 13', testZoom);
  it('Latitude  40.7413549', testLatitude);
  it('Longitude -73.9980244', testLongitude);
  it('View not empty', testViewEmpty);
};

const testMyFirstMap = (map) => {
  const myFirstMap = testFirstMap(map);
  describe('First map', myFirstMap);
};

firstMap(testMyFirstMap);
JSDOM.fromFile('src/first-map.html', {
  resources: 'usable',
  runScripts: 'dangerously',
});
