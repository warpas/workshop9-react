console.log("src/app.js reporting!");

var React = require('react/addons');
var $ = require('jquery');
var RB = require('react-bootstrap');

var Header = React.createClass({
  render: function() {
    return (
      <RB.Navbar brand='News Feed on React.js' staticTop='true' inverse='true' right='true'>
        <h5>Pilot Academy Workshop</h5>
      </RB.Navbar>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Stories source="https://fierce-gorge-1132.herokuapp.com/stories" />
        <RB.Button bsStyle="info" href="https://github.com/warps/workshop9-react">Github Link</RB.Button>
      </div>
    );
  }
});

var Stories = React.createClass({
  getInitialState: function() {
    return {
      all: []
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      if(this.isMounted()) {
        this.setState({
          all: result
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div className="stories">
        <h4>Stories:</h4>
        {this._storyList()}
      </div>
    );
  },

  _storyList: function() {
    if(this.state.all.length > 0) {
      var storyList = this.state.all.map(function(story) {
        return <Story entry={story} />;
      })
    }
    return <RB.ListGroup>{storyList}</RB.ListGroup>;
  }
});

var Story = React.createClass({
  render: function() {
    return (
      <RB.ListGroupItem>
        <a href={this.props.entry.url}>
          {this.props.entry.title}
        </a>
      </RB.ListGroupItem>
    );
  }
});

React.render(<Header />, document.getElementById('head-slot'));
React.render(<App />, document.getElementById('slot'));
