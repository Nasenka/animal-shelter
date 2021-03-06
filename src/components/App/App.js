import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import {
  Link,
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import Animals from '../../pages/Animals';
import Login from '../../pages/Login';
import Today from '../../pages/Today';

import style from './App.module.css';

class App extends React.PureComponent {
  render() {
    const { Header, Footer, Content } = Layout;
    const loggedIn = localStorage.getItem('session');

    return (
      <Router>
        <Layout>
          <Header>
            <div className={style.container}>
              <Menu mode="horizontal" theme="dark">
                <Menu.Item key="1">
                  <Link to="/today">Сегодня</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/animals">Животные</Link>
                </Menu.Item>
              </Menu>
            </div>
          </Header>
          <Content style={{ padding: '50px 0' }}>
            <div className={style.container}>
              <Switch>
                <Route exact path="/login">
                  {!loggedIn ? <Login /> : <Redirect to="/" />}
                </Route>
                {!loggedIn && <Redirect to="/login" />}
                <Route exact path={['/', '/today']}>
                  <Today />
                </Route>
                <Route path="/animals">
                  <Animals />
                </Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
