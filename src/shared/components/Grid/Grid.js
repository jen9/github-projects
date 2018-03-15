import React, { Component } from "react";

import "./Grid.css";

class Grid extends Component {
    static contextTypes = {
    };

    static defaultProps = {
        projects: []
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            projects: this.props.projects
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.projects.length) {
            this.setState({ projects: nextProps.projects });
        }
    }

    render() {
        return (
            <div>
                { this.state.projects.map((p, id) =>
                    <div key={id} className="projects-row">
                        <span className="projects-row__item">{p.name}</span>
                        <span className="projects-row__item">{p.description}</span>
                        <span className="projects-row__item">{p.url}</span>
                        <span className="projects-row__item">{p.forks_count}</span>
                        <span className="projects-row__item">{p.watchers_count}</span>
                    </div>)}
            </div>
        );
    }
}


export default Grid;
