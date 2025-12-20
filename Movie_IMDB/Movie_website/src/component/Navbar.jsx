import React from 'react'
import { NavLink } from 'react-router-dom'
import { Layout, Flex, Typography, Menu, Switch, theme, Row,Col } from "antd";
import image from '../assets/logo.png'
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
const { useToken } = theme; 

const {Header} = Layout;
const { Title, Text } = Typography;
function Navbar( {isDark,setIsDark} ) {
    const { token } = useToken();
    const items = [
        {
            key:"home",
            label:<NavLink to='/'>Home</NavLink>,
        },
         {
      key: "watchlist",
      label: <NavLink to="/watchlist">WatchList</NavLink>,
    },
    {
      key: "search",
      label: <NavLink to="/search">Search Movies</NavLink>,
    },
    ]
  return (
    <div style={{background: token.colorBgBase,}}>
        <Header style={{padding: "16px 40px" }}>
            <Flex justify='space-between' align='center'style={{ fontSize: "20px" }} >
                <img src={image} alt="" width={'110px'}/>
                <Title level={2} style={{marginLeft:200}}>Movies</Title>
                <Col>
  <Flex align="center" gap={16}>
    <Menu items={items} mode="horizontal" style={{ fontSize: "17px" }} />
    <Switch
      checked={isDark}
      onChange={() => {
        setIsDark(prev => !prev);
        localStorage.setItem('isDark', !isDark);
        
      }}
      checkedChildren={<MoonOutlined />}
      unCheckedChildren={<SunOutlined />}
    />
  </Flex>
</Col>
                    
               
     

            </Flex>
            
        </Header>
        
    </div>
)
}
export default Navbar;
