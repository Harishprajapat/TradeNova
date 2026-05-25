import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, Github, Mail, Chrome, ArrowRight } from "lucide-react";
import AuthShell from "./AuthShell";
import Button from "../ui/Button";
import { API_BASE_URL } from "../../config/appConfig";

const DEMO_ACCOUNT = {
  email: "demo@tradenova.com",
  password: "tradenova123",
  name: "Demo Trader",
  userId: "demo-user",
  token: "demo-token",
};

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("currentUser", res.data.userId);
      localStorage.setItem("userName", res.data.name);
      window.dispatchEvent(new Event("authchange"));
      toast.success("Login successful");
      setTimeout(() => navigate("/dashboard"), 350);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const loginAsDemo = () => {
    localStorage.setItem("token", DEMO_ACCOUNT.token);
    localStorage.setItem("currentUser", DEMO_ACCOUNT.userId);
    localStorage.setItem("userName", DEMO_ACCOUNT.name);
    window.dispatchEvent(new Event("authchange"));
    toast.success("Demo session ready");
    navigate("/dashboard");
  };

  const socialButton =
    "inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-border-soft bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.07]";

  return (
    <AuthShell
      eyebrow="Premium access"
      title="Sign in to your trading workspace"
      subtitle="Use your TradeNova account to review positions, orders, and AI insights in a polished, real-world dashboard."
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Email
          </label>
          <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
            <Mail className="h-4 w-4 text-slate-500" />
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full bg-transparent text-sm text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Password
          </label>
          <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
            <Mail className="h-4 w-4 text-slate-500 opacity-0" />
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Your secure password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full bg-transparent text-sm text-white placeholder:text-slate-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-slate-400 transition hover:text-white"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-400">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border-white/10 bg-transparent text-accent-500 focus:ring-accent-500/30"
            />
            Remember me
          </label>
          <button type="button" className="text-slate-300 transition hover:text-white">
            Forgot password?
          </button>
        </div>

        <Button type="submit" className="w-full py-3.5" disabled={loading}>
          {loading ? "Signing in..." : "Continue to dashboard"}
          <ArrowRight className="h-4 w-4" />
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <button type="button" className={socialButton}>
            <Github className="h-4 w-4" />
            GitHub
          </button>
          <button type="button" className={socialButton}>
            <Chrome className="h-4 w-4" />
            Google
          </button>
        </div>

        <Button variant="secondary" type="button" className="w-full py-3.5" onClick={loginAsDemo}>
          Use demo account
        </Button>

        <div className="pt-2 text-center text-sm text-slate-400">
          New to TradeNova?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="font-semibold text-accent-300 transition hover:text-accent-200"
          >
            Create account
          </button>
        </div>
      </form>
    </AuthShell>
  );
}


