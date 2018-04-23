import React, { Component } from 'react'

export default class extends Component {
    static getInitialProps(ctx) {
        return {
            stars: ctx.query.stars
        };
    }

    render() {
        return (
            <div>
                <h1>zeit/next.js has {this.props.stars} stars!</h1>
            </div>
        );
    }
}
