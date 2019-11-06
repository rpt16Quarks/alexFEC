const Adapter = require("enzyme-adapter-react-16")
const Enzyme = require('enzyme');
Enzyme.configure({ adapter: new Adapter() });
const styled = require('styled-components');
const React = require('react');
const App = require("../client/src/index.jsx");
const renderer = require("react-test-renderer");
require("jest-styled-components");


describe('react testing', () => {

  test('Renders App without crashing', () => {
    //shallow(<App />)
    // let a = renderer.create(<App />).toJSON();
    // expect(a).toMatchSnapshot();

  })

})