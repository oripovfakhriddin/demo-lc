import { Fragment, useState } from "react"
import propTypes from "prop-types"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LoginOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Modal } from 'antd';
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.scss"

const { Header, Sider, Content } = Layout;


const AdminLayout = ({setIsLogin}) => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logOutFunction = () => {
    Modal.confirm({
      title: 'Do you want to exit',
      onOk: () => {
        setIsLogin(false)
        navigate("/login")
        localStorage.removeItem("token")
      }
    });
  }

  return (
    <Fragment>
      <Layout>
        <Sider className="ofa__admin__asside" trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical " />
          <div>
            <h3 className="ofa__admin__logo">
              { collapsed ? "Steam"  : "STEAM LC" }
            </h3>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: <Link to="/dashboard">Dashboard</Link>,
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: <Link to="/teachers">Teachers</Link>,
              },
              {
                key: '3',
                icon: <VideoCameraOutlined />,
                label: <Link to="/students">Students</Link>,
              },
              {
                key: '4',
                icon: <LoginOutlined />,
                label: <Button onClick={logOutFunction}>Log Out</Button>
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            className="ofa__admin__header"
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            className="ofa__admin__main"
            style={{
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  )
}

AdminLayout.propTypes = {
  setIsLogin: propTypes.func,
}

export default AdminLayout