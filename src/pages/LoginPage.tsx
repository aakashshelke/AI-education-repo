import { useAuth } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { supabase } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (!error) {
      navigate("/home");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={handleSignIn}
        className="bg-blue-500 text-white px-6 py-2 rounded-md"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;
