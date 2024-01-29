import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.scss';

const LoginSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordConfirmError, setPasswordConfirmError] = useState('');

    const [toggleAuthType, setToggleAuthType] = useState(true);

    const navigate = useNavigate();

    //temporarily added below function since logic or API yet to be made for actual login or signup - acts a redirect
    const redirectToPath = (path: string) => {
        navigate(path);
    };

    //temporarily unused not to be removed as built for further API Logic for Sigup or Login
    // const handleLogin = () => {
    //     console.log('Logging in with:', email, password);
    // };

    // const handleGoogleLogin = () => {
    //     console.log('Logging in with Google');
    // };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(emailRegex.test(email) ? '' : 'Invalid email address');
    };

    const validatePassword = () => {
        setPasswordError(password.length >= 6 ? '' : 'Password must be at least 6 characters');
    };

    return (
        <div className={styles.authContainer}>
            <div
                className={styles.authHeader}
                onClick={() => setToggleAuthType(true)}>
                Login
            </div>
            <div className={styles.authForm}>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        validateEmail();
                    }}
                />
                <span>{emailError}</span>
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        validatePassword();
                    }}
                />
                <span>{passwordError}</span>
            </div>
            <div className={styles.authActions}>
                <button
                    onClick={() => redirectToPath('/home')}
                //  onClick={toggleAuthType ? handleLogin : ''}
                >
                    {toggleAuthType ? 'Login' : 'Signup'}
                </button>
                <button
                    onClick={() => redirectToPath('/home')}
                // onClick={handleGoogleLogin}
                >Sign in with Google</button>
            </div>
        </div >
    );
};

export default LoginSignup;
