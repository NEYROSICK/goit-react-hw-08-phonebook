import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from 'redux/operations';
import cl from './register.module.css';
import { getErrorReg } from 'redux/selectors';
import { Notify } from 'notiflix';

Notify.init({
  useIcon: false,
  timeout: 5000,
  fontSize: '14px',
  borderRadius: '20px',
  className: cl.message,
  warning: {
    background: '#ff0066',
  },
});

const Register = () => {
  const dispatch = useDispatch();
  const authError = useSelector(getErrorReg);

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    const user = { name, email, password };

    dispatch(register(user));
  };

  return (
    <>
      <form className={cl.form} onSubmit={handleSubmit}>
        <div className={cl.inputField}>
          <input
            className={cl.input}
            type="name"
            id="name"
            name="name"
            placeholder="John Doe"
            required
          />
          <label className={cl.label} htmlFor="name">
            Name
          </label>
        </div>
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
        <button className={cl.button}>Sign Up</button>
      </form>
      <p className={cl.linkMessage}>
        Already have an account?{' '}
        <Link className={cl.link} to="/login">
          Log in
        </Link>
      </p>

      {authError &&
        Notify.warning(
          'Input data is not valid, or such user is already registered'
        )}
    </>
  );
};

export default Register;
