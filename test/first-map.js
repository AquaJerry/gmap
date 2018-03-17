import './first-map/view-sync';
import firstMap from '../src/first-map';
import spec from './first-map/spec';

const describeMap = map => () => {
  const beforeMap = spec.beforeMap(map);
  before(beforeMap);
  it('Zoom 13', spec.itZoom);
  it('Latitude  40.7413549', spec.itLatitude);
  it('Longitude -73.9980244', spec.itLongitude);
  it('View not empty', spec.itViewEmpty);
};
const errHandle = () => {};

((async () => {
  const myDescribeMap = describeMap(await firstMap);
  describe('First map', myDescribeMap);
})()).catch(errHandle);
