import React, { Component } from "react";
import { debounce } from 'lodash';

import "./SearchInput.css";

class SearchInput extends Component {
    static contextTypes = {};

    static defaultProps = {};

    constructor(props, context) {
        super(props, context);

        this.state = {
            userData: {},
            userName: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onFetchSuccessUserData = this.onFetchSuccessUserData.bind(this);
        this.onFetchFailUserData = this.onFetchFailUserData.bind(this);
        this.onFetchSuccessUserRepos = this.onFetchSuccessUserRepos.bind(this);
        this.onFetchFailUserRepos = this.onFetchFailUserRepos.bind(this);
        this.fetchUserData = debounce(this.fetchUserData, 500);
        this.fetchUserRepos = this.fetchUserRepos.bind(this);
    }

    onFetchSuccessUserData(userData) {
        this.setState({ userData: {
            name: userData.name,
            company: userData.company,
            email: userData.email,
            followers: userData.followers,
            updated_at: userData.updated_at,
            avatar_url: userData.avatar_url,
        }})
    }

    onFetchFailUserData() {
        this.setState({userData: {}});
    }

    onFetchSuccessUserRepos(repos) {
        const onFetchSuccessUserReposCb = this.props.onFetchSuccessUserRepos;
        onFetchSuccessUserReposCb && onFetchSuccessUserReposCb(repos);

    }

    onFetchFailUserRepos(data) {
        const onFetchFailUserReposCb = this.props.onFetchFailUserRepos;
        onFetchFailUserReposCb && onFetchFailUserReposCb(data);
    }

    fetchUserData(userName) {
        fetch(`https://api.github.com/users/${encodeURIComponent(userName)}`)
            .then(resp => resp.json())
            .then(this.onFetchSuccessUserData)
            .catch(this.onFetchFailUserData);
    }

    fetchUserRepos() {
        const { userName } = this.state.userName;
        fetch(`https://api.github.com/users/${encodeURIComponent(userName)}/repos`)
            .then(resp => resp.json())
            .then(this.onFetchSuccessUserRepos)
            .catch(this.onFetchFailUserRepos);
    }

    onChange(e) {
        const value = e.target.value.toString();
        this.setState({ userName: value });
        this.fetchUserData(value);
    }

    render() {
        const userDataExist = !!Object.keys(this.state.userData).length;
        const { name, company, email, followers, updated_at, avatar_url } = this.state.userData;
        return (
            <div className="main-search">
                <input
                    className="main-search__input"
                    type="search"
                    name="search"
                    onChange={this.onChange}
                />
                {userDataExist && <div className="main-search__user-data">
                    <img src={avatar_url} alt={name} className="main-search__image"/>
                    <p>name: {name}</p>
                    <p>company: {company}</p>
                    <p>email: {email}</p>
                    <p>followers: {followers}</p>
                    <p>updated_at: {updated_at}</p>
                    <p>avatar_url: {avatar_url}</p>
                </div>}
                {userDataExist && <span className="user-data__projects" onClick={this.fetchUserRepos}>user projects</span>}
                {!userDataExist && <span>No user data</span>}
            </div>
        );
    }
}


export default SearchInput;
