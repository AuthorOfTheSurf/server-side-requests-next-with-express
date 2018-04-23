import React, { Component } from "react";

export default class extends Component {
    // `nextApp.render` sends the given map of values here, under `ctx`
    // We return a simple map that will be available under this.props
    // throughout this component
    static getInitialProps(ctx) {
        return {
            repoTitle: ctx.query.repoTitle,
            stars: ctx.query.stars,
        };
    }

    render() {
        const { repoTitle, stars } = this.props;
        if (repoTitle) {
            return (
                <div>
                    <h1>{repoTitle} has {stars} stars!</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Unknown repo parameter to given!</h1>
                </div>
            );
        }
    }
}
