
import fetch from 'node-fetch';
import React, { Component } from 'react';

export default class Home extends Component {
  constructor() {
    super();
    this.state = { };
  }

  async componentDidMount() {
    const res = await fetch('/api/me');
    if (res.ok) {
      this.setState({
        session: await res.json()
      })
    }
  }

  renderLogin() {
    if (this.state.session) {
      return <div />;
    }

    return <a href={"/login"}>
      <button>Login</button>
    </a>;
  }

  renderLogout() {
    if (!this.state.session) {
      return <div />;
    }
    return  <div>
      <a href={"/api/logout"}>
        <button>Logout (API Route)</button>
      </a>
    </div>;
  }

  renderProfilePage() {
    if (!this.state.session) {
      return <div />;
    }
    return  <a href={"/profile"}>
      <button>Profile Page</button>
    </a>;
  }

  renderUser() {
    if (!this.state.session) {
      return <div />;
    }

    return <div>
      <h3>Rendered on the client</h3>
      <p>Subject: {this.state.session.sub}</p>
      <p>Email: {this.state.session.email}</p>
      <p>Name: {this.state.session.name}</p>
      <p>Access Token: {this.state.session.accessToken}</p>
    </div>
  }

  render () {
    return (
      <div>
        <p>Hello Next.js</p>
        {this.renderLogin()}
        {this.renderLogout()}
        {this.renderProfilePage()}
        {this.renderUser()}
      </div>
    )
  }
}
