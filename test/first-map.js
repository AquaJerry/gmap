import { expect } from 'chai';
import fs from 'fs';
import jsdomGlobal from 'jsdom-global';
import util from 'util';
import firstMap from '../src/first-map';

const readFile = util.promisify(fs.readFile);

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

((async () => {
  const firstMapHtml = await readFile('src/first-map.html', {
    encoding: 'utf-8',
  });
  jsdomGlobal(firstMapHtml, {
    resources: 'usable',
    runScripts: 'dangerously',
  });
  const map = await firstMap();
  const myFirstMap = testFirstMap(map);
  describe('First map', myFirstMap);
})());
