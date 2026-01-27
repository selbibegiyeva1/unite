import SignInForm from '../../components/auth/SignInForm'

function SignIn() {
    document.title = 'Unite Shop - Вход';

    return (
        <div className="px-[16px] pt-[32px] pb-[100px] h-full">
            <SignInForm />
        </div>
    )
}

export default SignIn