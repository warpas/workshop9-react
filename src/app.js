console.log("src/app.js reporting!");

var React = require('react/addons');
var $ = require('jquery');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <h3>Hello, world!</h3>
        <Stories source="https://fierce-gorge-1132.herokuapp.com/stories" />
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
    var storyList = [];
    if(this.state.all.length > 0) {
      this.state.all.forEach(function(story) {
        storyList.push(<li><a href={story.url}>{story.title}</a></li>);
      })
    }
    return <ul>{storyList}</ul>;
  }
});

React.render(<App />, document.getElementById('slot'));
