const React = require("react");
const { Component } = React;

class Try extends Component {
    render() {
        return(
            <li key={this.props.index}><b>{this.props.value.fruit}</b> - {this.props.value.taste}</li>
        )
    };

}

module.exports = Try;