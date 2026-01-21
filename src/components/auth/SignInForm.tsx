function SignInForm() {

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form className="flex flex-col gap-2 w-full max-w-md">
                <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md w-full"
                    placeholder="Username"
                    required
                    autoComplete="username"
                />
                <input
                    type="password"
                    className="p-2 border border-gray-300 rounded-md w-full"
                    placeholder="Password"
                    required
                    autoComplete="current-password"
                />
                <button
                    type="submit"
                    className="p-2 bg-blue-500 text-white rounded-md w-full cursor-pointer disabled:opacity-60"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}

export default SignInForm;
