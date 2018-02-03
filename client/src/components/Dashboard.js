import React from 'react';
import ClassSidebar from './Class-Sidebar';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = { user: {} };
    this.getUser();
  }
  getUser() {
    global.fetch('api/current_user', {
      method: 'GET',
      credentials: 'same-origin',
    }).then((res) => {
      return res.json();
    }).then((json) => {
      this.setState({ user: json.user });
    }).catch(() => {
      global.window.location = '/login';
    });
  }
  render() {
    return (
      <div>
        <h1>Welcome {this.state.user.firstName}</h1>
        <ClassSidebar classArray={[{ name: 'hello', section: '001' }]} />
      </div>
    );
  }
}

export default Dashboard;
