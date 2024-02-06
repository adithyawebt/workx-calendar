import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.scss';

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    const SSO_URL = 'https://workx.webtrigon.com/admin_sso/login';

    //temporarily added below function since logic or API yet to be made for actual login or signup - acts a redirect
    const redirectToPath = (path: string) => {
        navigate(path);
    };

    const openGoogleSignInPopup = () => {
        const googleSignInWindow = window.open(
            SSO_URL,
            '_blank',
            'noreferrer'
        );

        window.addEventListener('message', (event) => {
            if (event.data && event.data.token) {
                const token = event.data.token;
                localStorage.setItem('bearerToken', token);
                setTimeout(() => {
                    googleSignInWindow?.close();
                    navigate('/home');
                }, 500);
            } else if (event.data === 'googleSignInFailure') {
                googleSignInWindow?.close();
                alert('Google Sign In Failed. Please try again or after some time.');
            }
        });
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(emailRegex.test(email) ? '' : 'Invalid email address');
    };

    const validatePassword = () => {
        setPasswordError(password.length >= 6 ? '' : 'Password must be at least 6 characters');
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.authHeader}>
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
                >
                    Login
                </button>
                <button
                    onClick={openGoogleSignInPopup}
                >Sign in with Google</button>
            </div>
        </div >
    );
};

export default AuthPage;
