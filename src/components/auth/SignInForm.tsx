import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

function SignInForm() {
    const navigate = useNavigate();
    const { signIn, error } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setLocalError(null);

        try {
            await signIn({ username, password });
            navigate("/operator/home", { replace: true });
        } catch (err: any) {
            setLocalError(err?.message ?? "Sign in failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form className="flex flex-col gap-2 w-full max-w-md" onSubmit={onSubmit}>
                <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md w-full"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                />
                <input
                    type="password"
                    className="p-2 border border-gray-300 rounded-md w-full"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                />
                <button
                    type="submit"
                    disabled={submitting}
                    className="p-2 bg-blue-500 text-white rounded-md w-full cursor-pointer disabled:opacity-60"
                >
                    {submitting ? "Signing in..." : "Sign In"}
                </button>

                {(localError || error) && (
                    <div className="text-red-600 text-sm">{localError || error}</div>
                )}
            </form>
        </div>
    );
}

export default SignInForm;
