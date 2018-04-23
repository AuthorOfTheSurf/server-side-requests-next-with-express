import React, { Component } from "react";

export default class extends Component {
    static getInitialProps(ctx) {
        return {
            repoTitle: ctx.query.repoTitle,
            stars: ctx.query.stars,
        };
    }

    render() {
        const { repoTitle, stars } = this.props;
        return (
            <div>
                <h1>{repoTitle} has {stars} stars!</h1>
            </div>
        );
    }
}
