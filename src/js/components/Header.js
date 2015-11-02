var React = require('react');

var Header = React.createClass({
  render: function() {
    return (
      <header>
        <ul>
          <li>
            Title
          </li>
          <li>
            About
          </li>
          <li>
            Search
          </li>
        </ul>
      </header>
    );
  }
});

module.exports = Header;
