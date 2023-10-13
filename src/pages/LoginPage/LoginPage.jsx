import { Flex, message } from "antd"
import { Fragment } from "react"
import propTypes from "prop-types"
import { Button, Checkbox, Form, Input } from 'antd';

import "./LoginPage.scss"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({setIsLogin}) => {
  const navigate = useNavigate()
  const onFinish = (values) => {
    const getData = async () => {
      try {
        let {data} = await axios.post("https://reqres.in/api/login", values)
        localStorage.setItem("token", data.token)
        setIsLogin(true)
        navigate("/dashboard")
      } catch (err) {
        message.error(err.response.data.error);
      }
      
    }
    getData()
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Fragment>
      <Flex className="ofa__login__block" align="center" justify="center">
        <Form
          className="ofa__login__form"
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: false,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
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

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button className="ofa__login__btn" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Fragment>
  )
}

LoginPage.propTypes = {
  setIsLogin: propTypes.func,
}

export default LoginPage