import React, { useState } from 'react';
import AxiosInstance from '../helper/Axiosintances';
import user from '../components/css/user.css'
import { FaUser, FaLock } from "react-icons/fa";

const Login = (props) => {
  const { saveUser } = props;
  const [email, setEmail] = useState('thanhdev1@gmail.com');
  const [password, setPassword] = useState('111111');

  const handleLogin = async () => {
    try {
      const body = { email, password };
      const result = await AxiosInstance().post('api/login-user', body);
  
      if (result && result.success) {
        console.log('Đăng nhập thành công');
        saveUser(result.user);
        localStorage.setItem('user', JSON.stringify(result.user));
        alert('Đăng nhập thành công!');
      } else {
        console.log('Đăng nhập thất bại');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="body">
      <div className="wrapper">
        <form action="">
          <h1 style={{ color: "#fff" }}>Login</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder="Mail"
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className="icon" style={{ color: "#fff" }} />

          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              name='pswd'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" style={{ color: "#fff" }} />
          </div>

          <div className="remember-forgot">
            <label style={{ color: "#fff" }}><input type="checkbox" />Remember me</label>
            <a href="#"> Forgot password ?</a>
          </div>

          <button type="button" onClick={handleLogin}>Login</button>

          <div className="register-link">
            <p style={{ color: "#fff" }}> Don't have an account? <a href="/Register">register</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;