import React, { Component } from "react";
import SeacrhInput from "../shared/components/SearchInput/SearchInput";
import Grid from "../shared/components/Grid/Grid";

import './App.css';

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            projects: []
        };
        this.onFetchSuccessUserRepos = this.onFetchSuccessUserRepos.bind(this);
        this.onFetchFailUserRepos = this.onFetchFailUserRepos.bind(this);
    }

    onFetchSuccessUserRepos(data) {
        this.setState({ projects: data });
    }

    onFetchFailUserRepos() {
        this.setState({ projects: [] })
    }

    render() {
        const { projects } = this.state;
        return (
            <div className="App">
                <SeacrhInput
                    onFetchSuccessUserRepos={this.onFetchSuccessUserRepos}
                    onFetchFailUserRepos={this.onFetchFailUserRepos}/>
                <Grid projects={ projects }/>
            </div>
        );
    }
}

export default App;
