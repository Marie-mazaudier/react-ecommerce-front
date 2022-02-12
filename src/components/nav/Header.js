import React, { useState } from "react";
import { Menu , Badge} from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import {Link} from 'react-router-dom'
import firebase from 'firebase/compat/app';
import { useDispatch, useSelector } from "react-redux"; // dispach pour diffuser selector pour obtenir info
import { useHistory } from "react-router-dom"; // autre hook react pour retrouver le chemin
import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch()
  let history = useHistory()
  let {user, cart} = useSelector((state) => ({...state})) // state redux disponible ici
// on utilise user du fichier reducer redux
  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };
  const logout = () => {
    firebase.auth().signOut()
    dispatch({
        type: "LOGOUT", 
        payload:null,
    })
    history.push('/login')
  }
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>
      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge 
          count={cart.length}
          offset={[9,0]}
          >
              Cart
          </Badge>
         </Link>
      </Item>
      {user && ( // on affiche que si user est en ligne
        <SubMenu 
        icon={<SettingOutlined />} 
        title={user.email && user.email.split('@')[0]} // name marie@gmail.com split -> ['marie', 'gmail.com']
        className="float-right"
        > 
          
       { // conditionnal rendering
       user && user.role === 'subscriber' && ( 
       <Item ><Link to="/user/history">Dasboard</Link></Item>
       )
       }
        { // conditionnal rendering
       user && user.role === 'admin' && ( 
       <Item><Link to="/admin/dashboard">Dasboard</Link></Item>
       )
       }
      
        <Item icon={<LogoutOutlined />} onClick={logout}> Logout </Item>
      </SubMenu>
      )}
      {!user && ( // on affiche que si user est déceonnecté
          <Item key="register" icon={<UserAddOutlined />} className="float-right">
        
          <Link to="/register">Register</Link>
  
         </Item>
      )}

     {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
        
        <Link to="/login">Login</Link>

      </Item>
     )}
      <span className="float-right p-1">
     <Search/>
     </span>
    </Menu>
  );
};

export default Header;
