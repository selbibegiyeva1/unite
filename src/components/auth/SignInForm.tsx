import { type FormEvent } from 'react';
import { useSignIn } from '../../hooks/auth/useSignIn';
import { useTranslation } from '../../hooks/useTranslation';
import LanguageSwitcher from '../LanguageSwitcher';

function SignInForm() {
    const { t } = useTranslation();
    const {
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
    } = useSignIn();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await handleSignIn();
        } catch (err) {
            // Error is already handled in the hook
        }
    };

    return (
        <div className='m-auto max-w-[380px]'>
            <div className='flex items-center justify-center gap-3 mb-[24.5px]'>
                <img src="/favicon.png" alt="favicon" className='w-[35px]' />
                <p className='text-[24px] leading-8 font-bold'>Unite Shop</p>
            </div>
            <div className='flex justify-center mb-[35.5px]'>
                <LanguageSwitcher />
            </div>
            <center>
                <h2 className='text-[24px] leading-8 mb-3 font-bold'>{t.signIn.title}</h2>
            </center>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <center>
                    <p className='text-[#00000099] font-medium leading-6 mb-4 max-w-[309px]'>{t.signIn.subtitle}</p>
                </center>
                <div className='flex flex-col gap-[8px]'>
                    <span className='font-medium text-[15px]'>{t.signIn.loginLabel}</span>
                    <input
                        type="text"
                        className={`px-4 py-[12.5px] rounded-[8px] border outline-0 transition-colors ${errors.username
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-[#00000026] focus:border-blue-500'
                            }`}
                        placeholder={t.signIn.loginPlaceholder}
                        value={username}
                        onChange={handleUsernameChange}
                        autoComplete="username"
                        disabled={isLoading}
                    />
                    {errors.username && (
                        <span className='text-[15px] text-red-500'>{errors.username}</span>
                    )}
                </div>
                <div className='flex flex-col gap-[8px]'>
                    <span className='font-medium text-[15px]'>{t.signIn.passwordLabel}</span>
                    <input
                        type="password"
                        className={`px-4 py-[12.5px] rounded-[8px] border outline-0 transition-colors ${errors.password
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-[#00000026] focus:border-blue-500'
                            }`}
                        placeholder={t.signIn.passwordPlaceholder}
                        value={password}
                        onChange={handlePasswordChange}
                        autoComplete="current-password"
                        disabled={isLoading}
                    />
                    {errors.password && (
                        <span className='text-[15px] text-red-500'>{errors.password}</span>
                    )}
                </div>
                <button
                    type="submit"
                    className="p-[13px] mt-[8px] bg-[#2D85EA] hover:bg-[#2D85EA]/80 text-white rounded-[8px] w-full cursor-pointer disabled:bg-[#2D85EA]/80 disabled:cursor-not-allowed transition-colors"
                    disabled={isLoading}
                >
                    {isLoading ? t.signIn.loading : t.signIn.submitButton}
                </button>
                <center>
                    <p className='text-[#00000099] font-medium leading-6'>{t.signIn.registrationNote}</p>
                </center>
                <center>
                    <p className='text-[#2D85EA] font-medium leading-6 mt-4'>{t.signIn.support} {t.signIn.supportPhone}</p>
                </center>
            </form>

            {/* success */}
            {isSuccess && (
                <div className='fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[360px] p-4 bg-[#EAF7EE] border-2 border-[#C2D7C8] rounded-[10px] flex items-center gap-4'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 3.93552C14.795 3.33671 13.4368 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.662 20.9814 11.3283 20.9451 11M21 5L12 14L9 11" stroke="#50A66A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p>{t.signIn.successMessage}</p>
                    <button
                        type="button"
                        onClick={closeSuccessAlert}
                        aria-label={t.signIn.closeNotification}
                        className='cursor-pointer ml-auto'
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 5L15 15M15 5L5 15" stroke="black" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            )}

            {/* error */}
            {error && (
                <div className='fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[360px] p-4 bg-[#FCEDE9] border-2 border-[#DBBAB1] rounded-[10px] flex items-center gap-4'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 12H8M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#ED2428" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>{error}</p>
                    <button
                        type="button"
                        onClick={clearError}
                        aria-label={t.signIn.closeErrorNotification}
                        className='cursor-pointer ml-auto'
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 5L15 15M15 5L5 15" stroke="black" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}

export default SignInForm;
