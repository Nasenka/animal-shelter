import { Alert, Button, Form, Input } from 'antd';
import React from 'react';

import getExpiredDate from '../../utils/getExpiredDate';

class Login extends React.PureComponent {
  state = {
    error: '',
  };

  handleFinish = async values => {
    try {
      const response = await fetch(
        'https://acits-api.herokuapp.com/api/token/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        },
      );

      if (response.status !== 200) throw new Error();

      const { access, refresh } = await response.json();
      const session = {
        access,
        refresh,
        expiredDate: getExpiredDate(),
      };

      localStorage.setItem('session', JSON.stringify(session));

      window.location.replace('/today');
    } catch (error) {
      this.setState({
        error: 'Имя пользователя или пароль введены не верно',
      });
    }
  };

  handleValuesChange = () => {
    this.setState({
      error: '',
    });
  };

  render() {
    const { error } = this.state;

    return (
      <Form
        autoComplete="off"
        labelCol={{
          span: 7,
        }}
        name="auth"
        wrapperCol={{
          span: 10,
        }}
        onFinish={this.handleFinish}
        onValuesChange={this.handleValuesChange}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {error && (
          <Form.Item
            wrapperCol={{
              offset: 7,
              span: 10,
            }}
          >
            <Alert message={error} type="error" />
          </Form.Item>
        )}

        <Form.Item
          wrapperCol={{
            offset: 7,
            span: 10,
          }}
        >
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Login;
