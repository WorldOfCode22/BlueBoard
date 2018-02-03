import React from 'react';
import ClassSidebar from './Class-Sidebar';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = { user: { classes: [] } };
    this.getUser();
  }
  getUser() {
    global.fetch('api/current_user', {
      method: 'GET',
      credentials: 'same-origin',
    }).then((res) => {
      return res.json();
    }).then((json) => {
      console.log(json.user);
      this.setState({ user: json.user });
    }).catch(() => {
      global.window.location = '/login';
    });
  }
  getRender() {
    if (this.state.user.organization === 'none') {
      return (
        <div>
          <h3>In order to look at your classes and grades joing your organization.</h3>
          <button>Find Organization</button>
        </div>
      );
    }
    return (
      <div>
        <h1>Welcome {this.state.user.firstName}</h1>
        <ClassSidebar classArray={this.state.user.classes} />
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.getRender()}
      </div>
    );
  }
}

export default Dashboard;
