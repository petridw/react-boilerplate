var React = require('react');

var Header = require('./Header');
var Footer = require('./Footer');

var MainApp = React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        <main>
          <h1>Best app ever</h1>
          <p>YEP P MUCH</p>
          <p>Stop all the downloadin</p>
        </main>
        <Footer />
      </div>
    );
  }
});

module.exports = MainApp;
