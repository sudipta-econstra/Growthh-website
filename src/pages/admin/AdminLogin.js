import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/slices/adminAuthSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { admin, token, loading, error } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    if (admin && token) {
      navigate('/admin/dashboard'); // Navigate to the dashboard on successful login
    }
  }, [admin, token, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='login-auth-wrap'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-5 col-md-6 col-sm-12'>
            <div className="card">
              <div className="card-body">
                <div className='loginBox ps-0'>
                  <div className="logo-wrap">
                    <a href="/"><img src={process.env.PUBLIC_URL + '/assets/images/logo-navy.png'} alt="Growthh" className='img-fluid' /></a>
                  </div>
                  <h1 className='login-title'>
                    Welcome Back! <br />
                    <span className='position-relative sign-in me-2'>
                      <span>SIGN IN!</span>
                      <svg viewBox="0 0 156 59" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-blue login-svg"><path d="M156 41C156 50.9411 147.89 58.735 138.408 55.7499C135.073 54.7001 131.284 53.8018 124.799 53.8018C109.2 53.8018 109.197 59 93.598 59C77.9988 59 77.9987 53.8018 62.3995 53.8018C46.8003 53.8018 46.7977 59 31.1985 59C24.7151 59 20.9263 58.102 17.5923 57.0526C8.1099 54.0677 0 45.7429 0 35.8018V18C0 8.05888 8.1099 0.265901 17.5923 3.2508C20.9263 4.30029 24.7151 5.19824 31.1985 5.19824C46.7977 5.19824 46.7977 0 62.3995 0C78.0013 0 77.9988 5.19824 93.598 5.19824C109.197 5.19824 109.197 0 124.799 0C131.284 0 135.073 0.898168 138.408 1.94782C147.89 4.93288 156 13.2571 156 23.1982V41Z" ></path></svg>
                    </span>
                    with your credentials.
                  </h1>
                  <div className='form-wrap'>
                    <form className='w-100' onSubmit={handleSubmit}>
                      <div className="input-group mb-4">
                        <div className="input-group-prepend">
                          <div className="input-group-text"><i className="fi fi-br-envelope"></i></div>
                        </div>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="user@example.com"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="input-group mb-4">
                        <div className="input-group-text"><i className="fi fi-br-lock"></i></div>
                        <input
                          className="form-control border-right-0"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          required
                          id="password"
                          style={{ paddingRight: 20 }}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="input-group-text bg-white">
                          <i
                            className={`bi ${showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}
                            onClick={togglePasswordVisibility}
                            style={{ marginRight: 5, cursor: 'pointer', color: '#777' }}
                          />
                        </div>
                      </div>
                      <div className="mb-4 d-flex flex-wrap justify-content-between align-items-center">
                        <label className="custom-checkbox mb-0">
                          Remember Password
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                        <span className="d-inline-block my-2 f-w-medium">
                          <Link to="/admin/forgot-password" className='text-exp-blue1'>Forgot Password ?</Link>
                        </span>
                      </div>
                      <button type="submit" name="submit" className="btn btn-exp-primary-dark w-100 f-s-18" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                      </button>
                    </form>
                    {error && <div className='mt-2 alert gth-alert-danger-light mb-0'>{error}</div>}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminLogin;