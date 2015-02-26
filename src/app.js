console.log("src/app.js reporting!");

var React = require('react/addons');

var App = React.createClass({
  render: function() {
    return <h3>Hello, world!</h3>;
  }
});

React.render(<App />, document.getElementById('slot'));
