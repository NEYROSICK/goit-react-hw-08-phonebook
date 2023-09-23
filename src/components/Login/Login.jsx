import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from 'redux/operations';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import cl from '../Register/register.module.css';
import clsx from 'clsx';
import { getErrorLog } from 'redux/selectors';

Notify.init({
  useIcon: false,
  timeout: 5000,
  fontSize: '14px',
  borderRadius: '20px',
  className: clsx(cl.message, cl.login),
  warning: {
    background: '#ff0066',
  },
});

const Login = () => {
  const dispatch = useDispatch();
  const authError = useSelector(getErrorLog);

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    const user = { email, password };
    dispatch(login(user));
  };

  return (
    <>
      <form className={cl.form} onSubmit={handleSubmit}>
        <div className={cl.inputField}>
          <input
            className={cl.input}
            type="email"
            id="email"
            name="email"
            placeholder="JohnDoe@gmail.com"
            required
          />
          <label className={cl.label} htmlFor="email">
            Email
          </label>
        </div>
        <div className={cl.inputField}>
          <input
            className={cl.input}
            type="password"
            id="password"
            name="password"
            placeholder="********"
            required
          />
          <label className={cl.label} htmlFor="password">
            Password
          </label>
        </div>
        <button className={clsx(cl.button, cl.login)}>Log In</button>
      </form>
      <p className={clsx(cl.linkMessage, cl.login)}>
        Don't have an account?{' '}
        <Link className={clsx(cl.link, cl.login)} to="/register">
          Sign up
        </Link>
      </p>

      {authError && Notify.warning('Error! Not existing User!')}
    </>
  );
};

export default Login;
