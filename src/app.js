console.log("src/app.js reporting!");

var React = require('react/addons');

var App = React.createClass({displayName: "App",
  render: function() {
    return React.createElement("h3", null, "Hello, world!");
  }
});

React.render(
  React.createElement(App),
  document.getElementById('slot')
);
