import { expect } from 'chai';

// accepts a map model that should implement following interfaces:
//   LatLng      getCenter()
//   HTMLElement getDiv()
//   Number      getZoom()
// returns a function that should be loaded before `it` asserts
const beforeMap = map => function beforeNull() {
  const latlng = map.getCenter();
  this.lat = latlng.lat();
  this.lng = latlng.lng();
  this.div = map.getDiv();
  this.zoom = map.getZoom();
};
function itLatitude() {
  expect(this.lat).to.equal(40.7413549);
}
function itLongitude() {
  expect(this.lng).to.equal(-73.9980244);
}
function itViewEmpty() {
  expect(this.div).to.have.property('children').that.has.property(0);
}
function itZoom() {
  expect(this.zoom).to.equal(13);
}

export default {
  beforeMap,
  itLatitude,
  itLongitude,
  itViewEmpty,
  itZoom,
};
