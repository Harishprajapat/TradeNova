import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, Mail, User, ArrowRight, ShieldCheck } from "lucide-react";
import AuthShell from "./AuthShell";
import Button from "../ui/Button";
import { API_BASE_URL } from "../../config/appConfig";

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/auth/signup`, data);
      window.dispatchEvent(new Event("authchange"));
      toast.success("Account created successfully");
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Open a new account"
      title="Create your TradeNova profile"
      subtitle="Set up your trading workspace and get a clean, modern entry point for a portfolio-grade product experience."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Full name
          </label>
          <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
            <User className="h-4 w-4 text-slate-500" />
            <input
              required
              placeholder="Aarav Mehta"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full bg-transparent text-sm text-white placeholder:text-slate-500"
            />
          </div>
        </div>

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
            <ShieldCheck className="h-4 w-4 text-slate-500" />
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Create a secure password"
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

        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-4">
          <p className="text-sm font-semibold text-white">Why TradeNova?</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Portfolio-first UX, live dashboards, AI insights, and a calmer interface built for serious trading workflows.
          </p>
        </div>

        <Button type="submit" className="w-full py-3.5" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
          <ArrowRight className="h-4 w-4" />
        </Button>

        <div className="pt-2 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-semibold text-accent-300 transition hover:text-accent-200"
          >
            Sign in
          </button>
        </div>
      </form>
    </AuthShell>
  );
}


