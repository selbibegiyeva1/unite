import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import authService from '../../services/authService';

export function useSignIn() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '' });
    const [touched, setTouched] = useState({ username: false, password: false });
    const [isSuccess, setIsSuccess] = useState(false);

    const closeSuccessAlert = () => {
        setIsSuccess(false);
    };

    const clearError = () => {
        setError(null);
    };

    const validate = () => {
        const newErrors = { username: '', password: '' };
        let isValid = true;

        if (!username.trim()) {
            newErrors.username = 'Заполните поле';
            isValid = false;
        }

        if (!password.trim()) {
            newErrors.password = 'Заполните поле';
            isValid = false;
        }

        setErrors(newErrors);
        setTouched({ username: true, password: true });
        return isValid;
    };

    const handleSignIn = async () => {
        if (!validate()) {
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            await login(username, password);
            const userInfo = await authService.getUserInfo();
            const role = userInfo.user.role;
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                if (role === 'DIRECTOR') {
                    navigate('/director/home');
                } else {
                    navigate('/operator/home');
                }
            }, 2500);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Sign in failed. Please try again.';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        if (touched.username && errors.username) {
            setErrors(prev => ({ ...prev, username: e.target.value.trim() ? '' : 'Заполните поле' }));
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (touched.password && errors.password) {
            setErrors(prev => ({ ...prev, password: e.target.value.trim() ? '' : 'Заполните поле' }));
        }
    };

    return {
        username,
        password,
        errors,
        isLoading,
        error,
        isSuccess,
        handleSignIn,
        handleUsernameChange,
        handlePasswordChange,
        closeSuccessAlert,
        clearError,
    };
}
