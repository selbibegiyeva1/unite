import SignInForm from '../../components/auth/SignInForm'
import { useTranslation } from '../../hooks/useTranslation'

function SignIn() {
    const { t } = useTranslation();
    document.title = t.signIn.pageTitle;

    return (
        <div className="px-[16px] pt-[32px] pb-[100px] h-full">
            <SignInForm />
        </div>
    )
}

export default SignIn