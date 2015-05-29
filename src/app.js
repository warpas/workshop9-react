console.log("src/app.js reporting!");

var React = require('react/addons');
var $ = require('jquery');
var RB = require('react-bootstrap');
var Router = require('react-router');

var Header = React.createClass({
  render: function() {
    return (
      <RB.Navbar brand='News Feed on React.js' staticTop='true' inverse='true' right='true'>
        <h5>Pilot Academy Workshop</h5>
      </RB.Navbar>
    );
  }
});

var Popular = React.createClass({
  render: function() {
    return (
      <div className="popular-class-popular">
        <Stories source="https://fierce-gorge-1132.herokuapp.com/stories" />
      </div>
    );
  }
});

var Recent = React.createClass({
  render: function() {
    return (
      <div className="popular-class-popular">
        <Stories source="https://fierce-gorge-1132.herokuapp.com/stories/recent" />
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div>
        <div id="head-slot">
          <Header />
        </div>
        <div className="container">
          <h3>Stories</h3>
          <Router.Link to="popular">
            <RB.Button bsStyle="primary" className="btn-popular" href="/popular">
              Popular
            </RB.Button>
          </Router.Link>
          <Router.Link to="recent">
            <RB.Button bsStyle="primary" className="btn-recent" href="/recent">
              Recent
            </RB.Button>
          </Router.Link>
          <Router.RouteHandler />
          <RB.Button bsStyle="info" href="https://github.com/warps/workshop9-react">Github Link</RB.Button>
        </div>
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
        {this._storyList()}
      </div>
    );
  },

  _storiesLength: function() {
    return <RB.Badge>{this.state.all.length}</RB.Badge>;
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

var routes = (
  <Router.Route handler={App} path="/">
    <Router.DefaultRoute handler={Popular} />
    <Router.Route name="popular" handler={Popular} />
    <Router.Route name="recent" handler={Recent} />
  </Router.Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
