var React = require('react');

var Main = React.createClass({
  handleClick() {
    throw new Error('messed up');
  },
  render() {
    return (
      <div onClick={this.handleClick}>
        moar
      </div>
    );
  }
});

React.render(<Main />, document.body);
