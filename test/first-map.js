import {expect} from 'chai'
import {JSDOM} from 'jsdom'

const noop = () => {}

const firstMapBefore = ({document}) => () => {
  const {window}=document
  const {map}=window
  const latlng = map.getCenter()
  this.lat = latlng.lat()
  this.lng = latlng.lng()
  this.div = map.getDiv()
  this.zoom = map.getZoom()
}
function testLatitude() {
  expect(this.lat).to.equal(40.7413549)
}
function testLongitude() {
  expect(this.lng).to.equal(-73.9980244)
}
function testViewEmpty() {
  expect(this.div).to.have.property('children')
  .that.is.not.empty
}
function testZoom() {
  expect(this.zoom).to.equal(13)
}

const firstMap = dom => () => {
  const myFirstMapBefore = firstMapBefore(dom)
  before(myFirstMapBefore)
  it('Zoom 13', testZoom)
  it('Latitude  40.7413549', testLatitude)
  it('Longitude -73.9980244', testLongitude)
  it('View not empty', testViewEmpty)
}

(async function(){
  const dom = await JSDOM.fromFile('../dist/first-map.html')
  const myFirstMap = firstMap(dom)
  describe('First map', myFirstMap)
}()).catch(noop)
