console.log("src/app.js reporting!");

var React = require('react/addons');
var $ = require('jquery');
var RB = require('react-bootstrap');
var Router = require('react-router');

var App = React.createClass({
  render: function() {
    return (
      <div >
        <Header />
        <div className="container">
          <h3>Stories</h3>
          <Menu />
          <Router.RouteHandler />
          <RB.Button bsStyle="info" href="https://github.com/warps/workshop9-react">Github Link</RB.Button>
        </div>
      </div>
    );
  }
});

var Header = React.createClass({
  render: function() {
    return (
      <div className="head-slot">
        <RB.Navbar brand='News Feed on React.js' staticTop={true} inverse={true}>
          <h5>Pilot Academy Workshop</h5>
        </RB.Navbar>
      </div>
    );
  }
});

var Menu = React.createClass({
  render: function() {
    return (
      <nav className="menu">
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
      </nav>
    );
  }
});

var NotFound = React.createClass({
  render: function() {
    return (
      <div className="not-found">
        <h4>Path not found</h4>
      </div>
    );
  }
});

var Popular = React.createClass({
  render: function() {
    return (
      <Stories source="https://fierce-gorge-1132.herokuapp.com/stories" />
    );
  }
});

var Recent = React.createClass({
  render: function() {
    return (
      <Stories source="https://fierce-gorge-1132.herokuapp.com/stories/recent" />
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
    <Router.Route name="popular" handler={Popular} />
    <Router.Route name="recent" handler={Recent} />
    <Router.NotFoundRoute handler={NotFound}/>
    <Router.Redirect from="/" to="popular" />
  </Router.Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
