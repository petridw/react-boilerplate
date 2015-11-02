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
          <p>Or is it?</p>
          <h4>yep pretty much it is</h4>
        </main>
        <Footer />
      </div>
    );
  }
});

module.exports = MainApp;
