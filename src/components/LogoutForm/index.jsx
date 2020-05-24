import React, { useGlobal } from 'reactn';
import { navigate } from 'gatsby';
import { useForm } from 'react-hook-form';
import fetch from 'node-fetch';
// import './styles.scss';
import { useStateWithLocalStorage, deleteLocalStorage } from '../../hooks';

const LogoutForm = () => {
  const [apiSession] = useStateWithLocalStorage('apiSession');
  const { handleSubmit, errors, reset } = useForm();
  const [responseError, setResponseError] = useGlobal(false);
  const [message, setMessage] = useGlobal('');
  const [loading, setLoading] = useGlobal(false);
  const onSubmit = () => {
    if (responseError) setResponseError(false);
    // @TODO: returns error:  'csrf_token' URL query argument is invalid.
    // See: https://stackoverflow.com/questions/60797576/rest-drupal-8-user-logout-with-logout-token-and-cookie-but-error-with-csrf-token
    const doLogout = async (url, options) => {
      setLoading(true);
      setMessage('');
      try {
        const resp = await fetch(url, options).then(response => {
          return response;
        });
        const data = await resp.json();
        // console.log(data);
        if (!data.current_user) {
          if (data.message) {
            console.log(data);
            // Wrong credentials, etc.
            reset();
            setResponseError(true);
            setLoading(false);
            setMessage(data.message);
            deleteLocalStorage('apiSession');
          } else {
            setResponseError(true);
            setMessage('Logout response not recognized.');
          }
        } else if (!resp.ok) {
          // Response error.
          setResponseError(true);
          setMessage('Some Error.');
          setLoading(false);
          throw Error(resp.statusText);
        } else {
          // Success
          setLoading(false);
          setResponseError(false);
          const string = JSON.stringify(data);
          deleteLocalStorage('apiSession');
          navigate.replace('login');
          setMessage(`You were logged out: ${string}`);
        }
      } catch (error) {
        setLoading(false);
        setResponseError(true);
        setMessage(`Error caught: ${error}`);
        console.log(error);
      }
    };
    const sessionData = JSON.parse(apiSession);

    doLogout(
      // `${process.env.GATSBY_API_LOGIN_URL}/session/token`,
      `${process.env.GATSBY_API_LOGIN_URL}/user/logout?_format=json&token=${sessionData.logout_token}`,
      {
        method: 'POST',
        // Accept: 'application/json',
        headers: {
          'Content-Type': 'application/json'
          // 'X-CSRF-Token': sessionData.csrf_token,
          // Cookie: getLocalStorage('sessionToken')
        },

        credentials: 'include'
        // body: getLocalStorage('sessionToken')
      }
    );
  };
  return (
    <>
      {message ? <h3>{message}</h3> : ''}
      {loading ? <h4>Loading...</h4> : ''}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="submit" id="submit" name="submit" value="Logout" />
        {errors.submit && <p>{errors.submit.message}</p>}
      </form>
    </>
  );
};

export default LogoutForm;
