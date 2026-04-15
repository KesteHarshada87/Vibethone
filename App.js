import { useEffect, useRef, useState } from "react";

const palette = {
  bg: "#0A0E1A",
  surface: "#111827",
  card: "#1A2235",
  border: "#2A3A5C",
  accent: "#4F8EF7",
  accent2: "#22D3A5",
  accent3: "#F97316",
  muted: "#6B7FA3",
  text: "#E8EDF8",
  textSoft: "#A0AECF",
};

const modules = [
  {
    id: 1, level: "Beginner", title: "What is Machine Learning?",
    icon: "🧠", color: "#4F8EF7",
    concept: "Machine Learning is a subset of AI where systems learn from data to improve performance without being explicitly programmed. Think of it like teaching a child — instead of giving rules, you give examples.",
    examples: ["Spam email detection", "Netflix recommendations", "Voice assistants like Alexa"],
    xp: 100,
  },
  {
    id: 2, level: "Beginner", title: "Supervised vs Unsupervised",
    icon: "🎯", color: "#22D3A5",
    concept: "Supervised learning trains on labeled data (input → output pairs). Unsupervised learning finds hidden patterns in unlabeled data on its own. Semi-supervised sits between them.",
    examples: ["Supervised: Email spam filter", "Unsupervised: Customer segmentation", "Reinforcement: Game-playing AI"],
    xp: 120,
  },
  {
    id: 3, level: "Intermediate", title: "Decision Trees",
    icon: "🌳", color: "#F97316",
    concept: "A Decision Tree splits data by asking questions at each node. It's like a flowchart — at every branch, it decides which direction to go based on a feature. Highly interpretable and visual.",
    examples: ["Medical diagnosis", "Loan approval systems", "Customer churn prediction"],
    xp: 150,
  },
  {
    id: 4, level: "Intermediate", title: "Neural Networks",
    icon: "⚡", color: "#A855F7",
    concept: "Neural Networks mimic the human brain using layers of neurons. Data flows from input → hidden layers → output. Each connection has a weight that gets tuned during training (backpropagation).",
    examples: ["Image recognition", "Language translation", "Autonomous driving"],
    xp: 200,
  },
  {
    id: 5, level: "Advanced", title: "Transformers & Attention",
    icon: "🔮", color: "#EC4899",
    concept: "Transformers revolutionized NLP. The self-attention mechanism lets the model weigh the relevance of each word to every other word — enabling it to understand context at scale. GPT, BERT, and LLMs are all transformers.",
    examples: ["ChatGPT, Claude", "Code generation (Copilot)", "Multimodal AI (DALL·E)"],
    xp: 300,
  },
];

const quizData = [
  {
    q: "Which type of learning uses labeled training data?",
    options: ["Unsupervised", "Supervised", "Reinforcement", "Transfer"],
    ans: 1, module: 2,
  },
  {
    q: "What does a Decision Tree do at each node?",
    options: ["Generates random outputs", "Asks a question to split data", "Applies gradient descent", "Normalizes features"],
    ans: 1, module: 3,
  },
  {
    q: "What is the process of adjusting neural network weights called?",
    options: ["Forward pass", "Normalization", "Backpropagation", "Attention"],
    ans: 2, module: 4,
  },
  {
    q: "Which architecture powers GPT and Claude?",
    options: ["CNN", "RNN", "Decision Tree", "Transformer"],
    ans: 3, module: 5,
  },
  {
    q: "Machine Learning is a subset of which broader field?",
    options: ["Data Science", "Artificial Intelligence", "Statistics", "Computer Vision"],
    ans: 1, module: 1,
  },
];

const badges = [
  { id: "first_module", label: "First Step", icon: "🚀", desc: "Completed your first module" },
  { id: "quiz_ace", label: "Quiz Ace", icon: "🎓", desc: "Score 100% on a quiz" },
  { id: "explorer", label: "Explorer", icon: "🗺️", desc: "Visited all sections" },
  { id: "game_master", label: "Game Master", icon: "🎮", desc: "Beat the mini-game" },
  { id: "streak_3", label: "On Fire", icon: "🔥", desc: "3-day streak" },
];

const leaderboard = [
  { name: "Aditya K.", xp: 2340, badge: "🥇" },
  { name: "Priya M.", xp: 2100, badge: "🥈" },
  { name: "Rohit S.", xp: 1950, badge: "🥉" },
  { name: "Sneha R.", xp: 1800, badge: "" },
  { name: "You", xp: 0, badge: "", isMe: true },
];

const AUTH_USERS_KEY = "aiml_lab_users_v1";
const AUTH_SESSION_KEY = "aiml_lab_session_v1";
const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.27.3/full/pyodide.js";

function NavBar({ active, setActive, user, onLogout }) {
  const navs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "learn", label: "Learn", icon: "📚" },
    { id: "code", label: "Code Lab", icon: "💻" },
    { id: "quiz", label: "Quiz", icon: "✏️" },
    { id: "game", label: "Mini-Game", icon: "🎮" },
    { id: "simulate", label: "Simulate", icon: "🔬" },
    { id: "dashboard", label: "Dashboard", icon: "📊" },
  ];
  return (
    <nav style={{ background: `${palette.surface}CC`, borderBottom: `1px solid ${palette.border}`, padding: "0 24px", display: "flex", alignItems: "center", gap: 4, position: "sticky", top: 0, zIndex: 50, flexWrap: "wrap", backdropFilter: "blur(10px)", boxShadow: "0 8px 24px rgba(5, 10, 22, 0.35)" }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: palette.accent, marginRight: 24, padding: "12px 0", letterSpacing: -0.5 }}>
        AIML<span style={{ color: palette.accent2 }}>Lab</span>
      </div>
      {navs.map(n => (
        <button key={n.id} onClick={() => setActive(n.id)} style={{ background: active === n.id ? `${palette.accent}22` : "transparent", border: "none", color: active === n.id ? palette.accent : palette.textSoft, padding: "10px 14px", cursor: "pointer", borderRadius: 8, fontSize: 13, fontWeight: active === n.id ? 600 : 400, display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s" }}>
          <span style={{ fontSize: 14 }}>{n.icon}</span>{n.label}
        </button>
      ))}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, padding: "10px 0" }}>
        <div style={{ color: palette.textSoft, fontSize: 12, background: `${palette.accent}14`, border: `1px solid ${palette.accent}33`, padding: "6px 10px", borderRadius: 999 }}>
          {user?.name || "Learner"}
        </div>
        <button onClick={onLogout} style={{ background: `${palette.accent3}22`, border: `1px solid ${palette.accent3}55`, color: palette.accent3, padding: "8px 12px", cursor: "pointer", borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
          Logout
        </button>
      </div>
    </nav>
  );
}

function AuthPage({ onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      setError("Email and password are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || "[]");

    if (mode === "signup") {
      if (!name.trim()) {
        setError("Name is required for sign up.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (users.some((u) => u.email === cleanEmail)) {
        setError("Account already exists. Please login.");
        return;
      }

      const newUser = { name: name.trim(), email: cleanEmail, password };
      localStorage.setItem(AUTH_USERS_KEY, JSON.stringify([...users, newUser]));
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({ name: newUser.name, email: newUser.email }));
      onAuthSuccess({ name: newUser.name, email: newUser.email });
      return;
    }

    const matched = users.find((u) => u.email === cleanEmail && u.password === password);
    if (!matched) {
      setError("Invalid credentials. Please sign up first.");
      return;
    }

    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({ name: matched.name, email: matched.email }));
    onAuthSuccess({ name: matched.name, email: matched.email });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 980, display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 22 }}>
        <div style={{ background: `linear-gradient(150deg, ${palette.card}, #10233b)`, border: `1px solid ${palette.border}`, borderRadius: 18, padding: "32px 30px", boxShadow: "0 16px 40px rgba(5, 10, 22, 0.5)" }}>
          <div style={{ display: "inline-block", marginBottom: 14, background: `${palette.accent}22`, border: `1px solid ${palette.accent}44`, color: palette.accent, borderRadius: 999, padding: "4px 12px", fontSize: 11, fontWeight: 700, letterSpacing: 1.1 }}>
            WELCOME TO AIML LAB
          </div>
          <h1 style={{ margin: "0 0 12px", color: palette.text, fontSize: 42, lineHeight: 1.12, letterSpacing: -1.2 }}>
            Learn AI by
            <span style={{ display: "block", background: `linear-gradient(90deg, ${palette.accent}, ${palette.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              playing and building.
            </span>
          </h1>
          <p style={{ margin: 0, color: palette.textSoft, lineHeight: 1.7, maxWidth: 520 }}>
            Personalized modules, interactive games, and simulation-based understanding. Create your account to continue your learning journey.
          </p>
        </div>

        <div style={{ background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 16, padding: 24 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
            <button onClick={() => { setMode("login"); setError(""); }} style={{ flex: 1, borderRadius: 9, border: `1px solid ${mode === "login" ? palette.accent : palette.border}`, background: mode === "login" ? `${palette.accent}22` : "transparent", color: mode === "login" ? palette.accent : palette.textSoft, padding: "9px 0", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Login</button>
            <button onClick={() => { setMode("signup"); setError(""); }} style={{ flex: 1, borderRadius: 9, border: `1px solid ${mode === "signup" ? palette.accent2 : palette.border}`, background: mode === "signup" ? `${palette.accent2}22` : "transparent", color: mode === "signup" ? palette.accent2 : palette.textSoft, padding: "9px 0", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Sign Up</button>
          </div>

          <form onSubmit={handleSubmit}>
            {mode === "signup" && (
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" style={{ width: "100%", marginBottom: 10, background: palette.bg, border: `1px solid ${palette.border}`, borderRadius: 9, padding: "12px 12px", color: palette.text, fontSize: 14, outline: "none" }} />
            )}
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" style={{ width: "100%", marginBottom: 10, background: palette.bg, border: `1px solid ${palette.border}`, borderRadius: 9, padding: "12px 12px", color: palette.text, fontSize: 14, outline: "none" }} />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" style={{ width: "100%", marginBottom: 10, background: palette.bg, border: `1px solid ${palette.border}`, borderRadius: 9, padding: "12px 12px", color: palette.text, fontSize: 14, outline: "none" }} />
            {mode === "signup" && (
              <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm password" style={{ width: "100%", marginBottom: 10, background: palette.bg, border: `1px solid ${palette.border}`, borderRadius: 9, padding: "12px 12px", color: palette.text, fontSize: 14, outline: "none" }} />
            )}

            {error && <div style={{ marginBottom: 10, color: "#f87171", background: "#7f1d1d33", border: "1px solid #ef444466", borderRadius: 8, padding: "8px 10px", fontSize: 12 }}>{error}</div>}

            <button type="submit" style={{ width: "100%", background: mode === "signup" ? palette.accent2 : palette.accent, border: "none", borderRadius: 10, padding: "12px 14px", color: mode === "signup" ? "#05221a" : "#fff", fontWeight: 800, cursor: "pointer", fontSize: 14 }}>
              {mode === "signup" ? "Create Account" : "Login"}
            </button>
          </form>
          <p style={{ margin: "12px 0 0", fontSize: 11, color: palette.muted }}>
            Demo auth is stored in your browser localStorage.
          </p>
        </div>
      </div>
    </div>
  );
}

function HomePage({ setActive, completedModules, totalXp }) {
  return (
    <div style={{ padding: "48px 32px 64px", maxWidth: 1060, margin: "0 auto" }}>
      <div style={{ marginBottom: 38, background: `linear-gradient(140deg, ${palette.card}EE, #101a2dEE)`, border: `1px solid ${palette.border}`, borderRadius: 22, padding: "34px 32px", position: "relative", overflow: "hidden", boxShadow: "0 16px 40px rgba(5, 10, 22, 0.45)" }}>
        <div aria-hidden="true" style={{ position: "absolute", width: 260, height: 260, right: -80, top: -110, borderRadius: "50%", background: "radial-gradient(circle, rgba(79, 142, 247, 0.3), rgba(79, 142, 247, 0))" }} />
        <div aria-hidden="true" style={{ position: "absolute", width: 230, height: 230, right: 120, bottom: -150, borderRadius: "50%", background: "radial-gradient(circle, rgba(34, 211, 165, 0.24), rgba(34, 211, 165, 0))" }} />
        <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 22, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-block", background: `${palette.accent}22`, border: `1px solid ${palette.accent}44`, borderRadius: 20, padding: "5px 14px", fontSize: 11, color: palette.accent, marginBottom: 14, fontWeight: 700, letterSpacing: 1.1 }}>NEXT-GEN AIML LEARNING SPACE</div>
            <h1 style={{ fontSize: 50, fontWeight: 800, color: palette.text, margin: "0 0 12px", lineHeight: 1.1, letterSpacing: -1.6 }}>Build AI Skills<br /><span style={{ background: `linear-gradient(90deg, ${palette.accent}, ${palette.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>faster with play.</span></h1>
            <p style={{ fontSize: 16, color: palette.textSoft, lineHeight: 1.75, maxWidth: 620, margin: "0 0 24px" }}>Start from fundamentals, test concepts instantly, and train your intuition through interactive games and simulations. Learn by doing in one focused platform.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
              <button onClick={() => setActive("learn")} style={{ background: palette.accent, border: "none", color: "#fff", padding: "14px 28px", borderRadius: 11, fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 10px 22px rgba(79, 142, 247, 0.34)" }}>Start Learning →</button>
              <button onClick={() => setActive("game")} style={{ background: `${palette.accent2}22`, border: `1px solid ${palette.accent2}66`, color: palette.accent2, padding: "14px 24px", borderRadius: 11, fontSize: 15, cursor: "pointer", fontWeight: 700 }}>Play Game Hub 🎮</button>
              <button onClick={() => setActive("simulate")} style={{ background: "transparent", border: `1.5px solid ${palette.border}`, color: palette.text, padding: "14px 22px", borderRadius: 11, fontSize: 15, cursor: "pointer" }}>Try Simulation 🔬</button>
            </div>
          </div>
          <div style={{ background: "#0f1628cc", border: `1px solid ${palette.border}`, borderRadius: 16, padding: 18 }}>
            <div style={{ fontSize: 12, color: palette.muted, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>YOUR MOMENTUM</div>
            <div style={{ display: "grid", gap: 10 }}>
              {[
                { label: "Completion", value: `${completedModules.length}/${modules.length}`, tone: palette.accent },
                { label: "XP Collected", value: totalXp, tone: "#F59E0B" },
                { label: "Modes Active", value: "Quiz + Games", tone: palette.accent2 },
              ].map((m) => (
                <div key={m.label} style={{ background: "#0a0f1dcc", border: `1px solid ${palette.border}`, borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ color: palette.textSoft, fontSize: 13 }}>{m.label}</span>
                  <span style={{ color: m.tone, fontWeight: 700, fontSize: 13 }}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Modules", value: `${completedModules.length}/${modules.length}`, icon: "📚", color: palette.accent },
          { label: "XP Earned", value: totalXp, icon: "⚡", color: "#F59E0B" },
          { label: "Topics", value: "10+", icon: "🧠", color: palette.accent2 },
          { label: "Game Modes", value: "2", icon: "🎮", color: "#EC4899" },
        ].map(s => (
          <div key={s.label} style={{ background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 12, padding: "20px 24px", boxShadow: "0 8px 22px rgba(5, 10, 22, 0.28)" }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: palette.muted, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 28 }}>
        {[
          { title: "Interactive Modules", desc: "Short concept cards with visual explainers and XP rewards.", icon: "📘" },
          { title: "Competitive Quizzes", desc: "Quick questions with instant feedback and score tracking.", icon: "✍️" },
          { title: "Enhanced Games", desc: "Algorithm Selector + Speed Classifier with streak mechanics.", icon: "🎯" },
        ].map((f) => (
          <div key={f.title} style={{ background: "#111a2ccc", border: `1px solid ${palette.border}`, borderRadius: 14, padding: "18px 18px" }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>{f.icon}</div>
            <div style={{ color: palette.text, fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{f.title}</div>
            <div style={{ color: palette.muted, fontSize: 13, lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 16, padding: 24 }}>
        <h3 style={{ margin: "0 0 16px", color: palette.text, fontSize: 16, fontWeight: 700 }}>Learning Path</h3>
        <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
          {["Beginner", "Intermediate", "Advanced"].map((lvl, i) => (
            <div key={lvl} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ background: i === 0 ? `${palette.accent}33` : i === 1 ? `${palette.accent2}33` : "#A855F733", border: `1px solid ${i === 0 ? palette.accent : i === 1 ? palette.accent2 : "#A855F7"}44`, borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, color: i === 0 ? palette.accent : i === 1 ? palette.accent2 : "#A855F7" }}>{lvl}</div>
              {i < 2 && <div style={{ width: 32, height: 2, background: palette.border, margin: "0 4px" }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LearnPage({ completedModules, setCompletedModules, setTotalXp }) {
  const [selected, setSelected] = useState(null);
  const mod = selected !== null ? modules[selected] : null;

  const complete = (mod) => {
    if (!completedModules.includes(mod.id)) {
      setCompletedModules(p => [...p, mod.id]);
      setTotalXp(x => x + mod.xp);
    }
  };

  return (
    <div style={{ padding: "32px", maxWidth: 960, margin: "0 auto" }}>
      {mod ? (
        <div>
          <button onClick={() => setSelected(null)} style={{ background: "transparent", border: `1px solid ${palette.border}`, color: palette.textSoft, padding: "8px 16px", borderRadius: 8, cursor: "pointer", marginBottom: 24, fontSize: 13 }}>← Back to Modules</button>
          <div style={{ background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 16, padding: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ fontSize: 40 }}>{mod.icon}</div>
              <div>
                <div style={{ fontSize: 11, color: mod.color, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>{mod.level.toUpperCase()}</div>
                <h2 style={{ margin: 0, fontSize: 26, color: palette.text, fontWeight: 800 }}>{mod.title}</h2>
              </div>
              <div style={{ marginLeft: "auto", background: `${mod.color}22`, border: `1px solid ${mod.color}44`, borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 700, color: mod.color }}>+{mod.xp} XP</div>
            </div>
            <div style={{ background: `${palette.bg}`, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: palette.muted, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>CORE CONCEPT</div>
              <p style={{ margin: 0, fontSize: 16, color: palette.text, lineHeight: 1.8 }}>{mod.concept}</p>
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: palette.muted, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>REAL-WORLD EXAMPLES</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {mod.examples.map((ex, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: palette.textSoft }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: mod.color, flexShrink: 0 }} />
                    {ex}
                  </div>
                ))}
              </div>
            </div>
            {mod.id === 3 && <DecisionTreeViz />}
            {mod.id === 4 && <NeuralNetViz />}
            <button onClick={() => complete(mod)} style={{ background: completedModules.includes(mod.id) ? `${palette.accent2}22` : palette.accent, border: completedModules.includes(mod.id) ? `1px solid ${palette.accent2}` : "none", color: completedModules.includes(mod.id) ? palette.accent2 : "#fff", padding: "14px 28px", borderRadius: 10, cursor: "pointer", fontSize: 15, fontWeight: 700, marginTop: 8 }}>
              {completedModules.includes(mod.id) ? "✓ Completed" : "Mark as Complete"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 style={{ color: palette.text, margin: "0 0 8px", fontSize: 28, fontWeight: 800 }}>Learning Modules</h2>
          <p style={{ color: palette.textSoft, margin: "0 0 28px", fontSize: 15 }}>Progress from beginner to advanced concepts at your own pace.</p>
          {["Beginner", "Intermediate", "Advanced"].map(lvl => (
            <div key={lvl} style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: palette.muted, letterSpacing: 1.5, marginBottom: 12 }}>{lvl.toUpperCase()}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                {modules.filter(m => m.level === lvl).map((m, i) => {
                  const done = completedModules.includes(m.id);
                  return (
                    <div key={m.id} onClick={() => setSelected(modules.indexOf(m))} style={{ background: palette.card, border: `1.5px solid ${done ? m.color + "66" : palette.border}`, borderRadius: 14, padding: "20px 22px", cursor: "pointer", transition: "border-color 0.2s, transform 0.1s", position: "relative" }}>
                      {done && <div style={{ position: "absolute", top: 14, right: 14, background: `${m.color}33`, borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>✓</div>}
                      <div style={{ fontSize: 28, marginBottom: 10 }}>{m.icon}</div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: palette.text, marginBottom: 6 }}>{m.title}</div>
                      <div style={{ fontSize: 13, color: palette.muted }}>{m.concept.slice(0, 80)}...</div>
                      <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontSize: 12, color: m.color, fontWeight: 700 }}>+{m.xp} XP</div>
                        <div style={{ fontSize: 12, color: palette.muted }}>Learn →</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DecisionTreeViz() {
  return (
    <div style={{ background: palette.bg, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 20, marginBottom: 24 }}>
      <div style={{ fontSize: 12, color: palette.muted, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>VISUAL AID — DECISION TREE</div>
      <svg width="100%" viewBox="0 0 400 200" style={{ maxWidth: 400 }}>
        <rect x="150" y="10" width="100" height="36" rx="6" fill="#F9731622" stroke="#F97316" strokeWidth="1" />
        <text x="200" y="33" textAnchor="middle" fill="#F97316" fontSize="12" fontWeight="600">Rainy?</text>
        <line x1="175" y1="46" x2="100" y2="86" stroke={palette.border} strokeWidth="1.5" />
        <line x1="225" y1="46" x2="300" y2="86" stroke={palette.border} strokeWidth="1.5" />
        <text x="130" y="78" fill={palette.muted} fontSize="11">Yes</text>
        <text x="265" y="78" fill={palette.muted} fontSize="11">No</text>
        <rect x="55" y="88" width="90" height="36" rx="6" fill="#4F8EF722" stroke="#4F8EF7" strokeWidth="1" />
        <text x="100" y="111" textAnchor="middle" fill="#4F8EF7" fontSize="12" fontWeight="600">Umbrella?</text>
        <rect x="255" y="88" width="90" height="36" rx="6" fill="#22D3A522" stroke="#22D3A5" strokeWidth="1" />
        <text x="300" y="111" textAnchor="middle" fill="#22D3A5" fontSize="12" fontWeight="600">Go out! ☀️</text>
        <line x1="80" y1="124" x2="55" y2="154" stroke={palette.border} strokeWidth="1.5" />
        <line x1="120" y1="124" x2="145" y2="154" stroke={palette.border} strokeWidth="1.5" />
        <text x="57" y="147" fill={palette.muted} fontSize="11">Yes</text>
        <text x="122" y="147" fill={palette.muted} fontSize="11">No</text>
        <rect x="20" y="156" width="70" height="30" rx="6" fill="#22D3A522" stroke="#22D3A5" strokeWidth="1" />
        <text x="55" y="176" textAnchor="middle" fill="#22D3A5" fontSize="11" fontWeight="600">Go! 🌂</text>
        <rect x="110" y="156" width="70" height="30" rx="6" fill="#E2484833" stroke="#E24848" strokeWidth="1" />
        <text x="145" y="176" textAnchor="middle" fill="#E24848" fontSize="11" fontWeight="600">Stay home</text>
      </svg>
    </div>
  );
}

function NeuralNetViz() {
  const layers = [[1, 2, 3], [1, 2, 3, 4], [1, 2]];
  const layerLabels = ["Input", "Hidden", "Output"];
  const colors = [palette.accent, palette.accent2, "#F97316"];
  const xs = [80, 200, 320];
  return (
    <div style={{ background: palette.bg, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 20, marginBottom: 24 }}>
      <div style={{ fontSize: 12, color: palette.muted, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>VISUAL AID — NEURAL NETWORK</div>
      <svg width="100%" viewBox="0 0 400 180">
        {layers.map((layer, li) =>
          layer.map((_, ni) => {
            const total = layer.length;
            const y = 30 + ni * (140 / (total + 1)) + 20;
            const nextLayer = layers[li + 1];
            return (
              <g key={`${li}-${ni}`}>
                {nextLayer && nextLayer.map((_, nni) => {
                  const total2 = nextLayer.length;
                  const y2 = 30 + nni * (140 / (total2 + 1)) + 20;
                  return <line key={nni} x1={xs[li]} y1={y} x2={xs[li + 1]} y2={y2} stroke={palette.border} strokeWidth="1" opacity="0.5" />;
                })}
                <circle cx={xs[li]} cy={y} r="12" fill={`${colors[li]}33`} stroke={colors[li]} strokeWidth="1.5" />
              </g>
            );
          })
        )}
        {layerLabels.map((l, i) => <text key={l} x={xs[i]} y="168" textAnchor="middle" fill={palette.muted} fontSize="11">{l}</text>)}
      </svg>
    </div>
  );
}

function QuizPage({ earnedBadges, setEarnedBadges, setTotalXp }) {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const q = quizData[qIndex];

  const choose = (i) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    if (i === q.ans) setScore(s => s + 1);
  };

  const next = () => {
    if (qIndex < quizData.length - 1) {
      setQIndex(q => q + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      setDone(true);
      setTotalXp(x => x + score * 30);
      if (score === quizData.length && !earnedBadges.includes("quiz_ace")) {
        setEarnedBadges(b => [...b, "quiz_ace"]);
      }
    }
  };

  const restart = () => { setQIndex(0); setSelected(null); setScore(0); setDone(false); setRevealed(false); };

  if (done) return (
    <div style={{ padding: 48, maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>{score === quizData.length ? "🎓" : score > 2 ? "👍" : "📖"}</div>
      <h2 style={{ color: palette.text, fontSize: 28, fontWeight: 800, margin: "0 0 8px" }}>Quiz Complete!</h2>
      <p style={{ color: palette.textSoft, margin: "0 0 24px" }}>You scored <span style={{ color: palette.accent, fontWeight: 700 }}>{score}/{quizData.length}</span> · +{score * 30} XP earned</p>
      {score === quizData.length && <div style={{ background: `${palette.accent2}22`, border: `1px solid ${palette.accent2}44`, borderRadius: 12, padding: 16, marginBottom: 24, color: palette.accent2, fontWeight: 600 }}>🎓 Badge Unlocked: Quiz Ace!</div>}
      <button onClick={restart} style={{ background: palette.accent, border: "none", color: "#fff", padding: "12px 28px", borderRadius: 10, cursor: "pointer", fontSize: 15, fontWeight: 700 }}>Try Again</button>
    </div>
  );

  return (
    <div style={{ padding: "32px", maxWidth: 680, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ color: palette.text, margin: 0, fontSize: 22, fontWeight: 800 }}>Quiz Mode</h2>
        <span style={{ color: palette.muted, fontSize: 14 }}>Q{qIndex + 1} / {quizData.length}</span>
      </div>
      <div style={{ background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 4, height: 4, marginBottom: 28 }}>
        <div style={{ background: palette.accent, height: 4, borderRadius: 4, width: `${((qIndex) / quizData.length) * 100}%`, transition: "width 0.3s" }} />
      </div>
      <div style={{ background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 16, padding: 28, marginBottom: 20 }}>
        <p style={{ fontSize: 18, fontWeight: 700, color: palette.text, margin: "0 0 24px", lineHeight: 1.5 }}>{q.q}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {q.options.map((opt, i) => {
            let bg = palette.bg, border = palette.border, color = palette.textSoft;
            if (revealed) {
              if (i === q.ans) { bg = `${palette.accent2}22`; border = palette.accent2; color = palette.accent2; }
              else if (i === selected) { bg = "#E2484822"; border = "#E24848"; color = "#E24848"; }
            } else if (selected === i) { bg = `${palette.accent}22`; border = palette.accent; color = palette.accent; }
            return (
              <div key={i} onClick={() => choose(i)} style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 10, padding: "14px 18px", cursor: revealed ? "default" : "pointer", fontSize: 15, color, fontWeight: 500, transition: "all 0.15s", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", border: `1.5px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>{String.fromCharCode(65 + i)}</span>
                {opt}
                {revealed && i === q.ans && <span style={{ marginLeft: "auto" }}>✓</span>}
              </div>
            );
          })}
        </div>
      </div>
      {revealed && (
        <button onClick={next} style={{ background: palette.accent, border: "none", color: "#fff", padding: "13px 28px", borderRadius: 10, cursor: "pointer", fontSize: 15, fontWeight: 700, width: "100%" }}>
          {qIndex < quizData.length - 1 ? "Next Question →" : "See Results"}
        </button>
      )}
    </div>
  );
}

function GamePage({ earnedBadges, setEarnedBadges, setTotalXp }) {
  const [gameMode, setGameMode] = useState("selector");

  const [phase, setPhase] = useState("intro");
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [choice, setChoice] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const [speedPhase, setSpeedPhase] = useState("intro");
  const [speedRound, setSpeedRound] = useState(0);
  const [speedScore, setSpeedScore] = useState(0);
  const [speedLives, setSpeedLives] = useState(3);
  const [speedChoice, setSpeedChoice] = useState(null);
  const [speedFeedback, setSpeedFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(12);
  const [speedStreak, setSpeedStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const scenarios = [
    { desc: "You want to detect cats vs dogs in photos. Which approach?", options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning"], ans: 0, explain: "We have labeled images, making this a supervised classification problem." },
    { desc: "Find hidden customer groups without predefined categories.", options: ["Linear Regression", "Clustering (Unsupervised)", "Decision Tree"], ans: 1, explain: "Without labels, we use clustering to discover natural groupings." },
    { desc: "Predict tomorrow's temperature based on historical data.", options: ["Classification", "Regression", "Clustering"], ans: 1, explain: "Predicting a continuous value (temperature) is a regression task." },
    { desc: "Train a robot to walk by rewarding good movements.", options: ["Supervised Learning", "Clustering", "Reinforcement Learning"], ans: 2, explain: "Learning through reward signals defines reinforcement learning." },
    { desc: "Translate an English sentence to French.", options: ["Transformer/NLP", "Random Forest", "K-Means"], ans: 0, explain: "Sequence-to-sequence translation is a core NLP/Transformer task." },
  ];
  const speedScenarios = [
    { desc: "Identify whether an email is spam or not spam.", options: ["Classification", "Regression", "Clustering", "Dimensionality Reduction"], ans: 0, explain: "This predicts a category label, so it is classification." },
    { desc: "Estimate house prices from area, location, and bedrooms.", options: ["Clustering", "Classification", "Regression", "Reinforcement"], ans: 2, explain: "Prices are continuous values, so regression is best." },
    { desc: "Group customers by behavior with no known labels.", options: ["Regression", "Clustering", "Classification", "NLP Translation"], ans: 1, explain: "Finding natural groups in unlabeled data is clustering." },
    { desc: "Teach a game agent by rewarding wins and penalizing losses.", options: ["Supervised Learning", "Clustering", "Reinforcement Learning", "Linear Regression"], ans: 2, explain: "Learning from rewards is reinforcement learning." },
    { desc: "Convert English to French sentence by sentence.", options: ["Decision Tree", "K-Means", "Transformer/NLP", "PCA"], ans: 2, explain: "Machine translation is a core NLP transformer task." },
    { desc: "Predict if a transaction is fraudulent (yes/no).", options: ["Classification", "Regression", "Clustering", "Association Rules"], ans: 0, explain: "Fraud detection is typically binary classification." },
  ];

  const s = scenarios[round];
  const speedCurrent = speedScenarios[speedRound];
  const timerPct = (timeLeft / 12) * 100;

  const pick = (i) => {
    setChoice(i);
    if (i === s.ans) {
      setScore(sc => sc + 1);
      setFeedback({ ok: true, msg: s.explain });
    } else {
      setFeedback({ ok: false, msg: s.explain });
    }
  };

  const next = () => {
    if (round < scenarios.length - 1) {
      setRound(r => r + 1);
      setChoice(null);
      setFeedback(null);
    } else {
      setPhase("done");
      setTotalXp(x => x + score * 40 + 50);
      if (!earnedBadges.includes("game_master")) setEarnedBadges(b => [...b, "game_master"]);
    }
  };

  const resetSpeed = () => {
    setSpeedPhase("play");
    setSpeedRound(0);
    setSpeedScore(0);
    setSpeedLives(3);
    setSpeedChoice(null);
    setSpeedFeedback(null);
    setTimeLeft(12);
    setSpeedStreak(0);
  };

  const handleSpeedAnswer = (i, isTimeout = false) => {
    if (speedChoice !== null) return;

    const correct = i === speedCurrent.ans;
    const newScore = correct ? speedScore + 1 : speedScore;
    const newLives = correct ? speedLives : speedLives - 1;
    const newStreak = correct ? speedStreak + 1 : 0;

    setSpeedChoice(i === null ? -1 : i);
    setSpeedFeedback({
      ok: correct,
      msg: isTimeout ? `Time up! ${speedCurrent.explain}` : speedCurrent.explain,
    });
    setSpeedScore(newScore);
    setSpeedLives(newLives);
    setSpeedStreak(newStreak);
    setBestStreak(b => Math.max(b, newStreak));

    const isLast = speedRound === speedScenarios.length - 1;
    const shouldEnd = isLast || newLives <= 0;

    if (shouldEnd) {
      const bonus = newLives > 0 ? 80 : 30;
      setTotalXp(x => x + newScore * 35 + bonus);
      if (newScore >= 4 && !earnedBadges.includes("game_master")) {
        setEarnedBadges(b => [...b, "game_master"]);
      }
      setTimeout(() => setSpeedPhase("done"), 1000);
      return;
    }

    setTimeout(() => {
      setSpeedRound(r => r + 1);
      setSpeedChoice(null);
      setSpeedFeedback(null);
      setTimeLeft(12);
    }, 850);
  };

  useEffect(() => {
    if (gameMode !== "speed" || speedPhase !== "play" || speedChoice !== null) return;
    const timer = setTimeout(() => {
      if (timeLeft <= 1) {
        const newLives = speedLives - 1;
        setSpeedChoice(-1);
        setSpeedFeedback({
          ok: false,
          msg: `Time up! ${speedCurrent.explain}`,
        });
        setSpeedLives(newLives);
        setSpeedStreak(0);

        const isLast = speedRound === speedScenarios.length - 1;
        const shouldEnd = isLast || newLives <= 0;

        if (shouldEnd) {
          const bonus = newLives > 0 ? 80 : 30;
          setTotalXp(x => x + speedScore * 35 + bonus);
          if (speedScore >= 4 && !earnedBadges.includes("game_master")) {
            setEarnedBadges(b => [...b, "game_master"]);
          }
          setTimeout(() => setSpeedPhase("done"), 1000);
          return;
        }

        setTimeout(() => {
          setSpeedRound(r => r + 1);
          setSpeedChoice(null);
          setSpeedFeedback(null);
          setTimeLeft(12);
        }, 850);
      } else {
        setTimeLeft(t => t - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [gameMode, speedPhase, speedChoice, timeLeft, speedRound, speedLives, speedCurrent, speedScenarios.length, setEarnedBadges, setTotalXp, speedScore, earnedBadges]);

  return (
    <div style={{ padding: "32px", maxWidth: 760, margin: "0 auto" }}>
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ color: palette.text, margin: "0 0 6px", fontSize: 28, fontWeight: 800 }}>🎮 Game Hub</h2>
        <p style={{ color: palette.textSoft, margin: 0, fontSize: 14 }}>Play practice modes, build streaks, and earn bonus XP faster.</p>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        <button onClick={() => setGameMode("selector")} style={{ background: gameMode === "selector" ? `${palette.accent}33` : palette.card, color: gameMode === "selector" ? palette.accent : palette.textSoft, border: `1px solid ${gameMode === "selector" ? palette.accent + "66" : palette.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
          Algorithm Selector
        </button>
        <button onClick={() => setGameMode("speed")} style={{ background: gameMode === "speed" ? `${palette.accent2}33` : palette.card, color: gameMode === "speed" ? palette.accent2 : palette.textSoft, border: `1px solid ${gameMode === "speed" ? palette.accent2 + "66" : palette.border}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
          Speed Classifier
        </button>
      </div>
      {gameMode === "selector" ? (
        phase === "intro" ? (
          <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🎮</div>
            <h2 style={{ color: palette.text, fontSize: 28, fontWeight: 800, margin: "0 0 12px" }}>Algorithm Selector</h2>
            <p style={{ color: palette.textSoft, fontSize: 16, margin: "0 0 28px", lineHeight: 1.7 }}>You'll be presented with real-world ML problems. Choose the right algorithm type! Each correct answer earns XP.</p>
            <div style={{ background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 20, marginBottom: 28, textAlign: "left", boxShadow: "0 10px 28px rgba(8, 14, 30, 0.35)" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: palette.muted, letterSpacing: 1, marginBottom: 12 }}>GAME RULES</div>
              {["5 ML scenarios to solve", "Pick the best algorithm type", "Get instant explanations", "Earn up to 250 XP"].map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14, color: palette.textSoft, marginBottom: 8 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: `${palette.accent}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: palette.accent, fontWeight: 700 }}>{i + 1}</div>
                  {r}
                </div>
              ))}
            </div>
            <button onClick={() => setPhase("play")} style={{ background: palette.accent, border: "none", color: "#fff", padding: "14px 32px", borderRadius: 10, cursor: "pointer", fontSize: 16, fontWeight: 700 }}>Start Game →</button>
          </div>
        ) : phase === "done" ? (
          <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>{score >= 4 ? "🏆" : score >= 2 ? "🎯" : "📚"}</div>
            <h2 style={{ color: palette.text, fontSize: 28, fontWeight: 800, margin: "0 0 8px" }}>Game Over!</h2>
            <p style={{ color: palette.textSoft, margin: "0 0 24px" }}>Score: <span style={{ color: palette.accent, fontWeight: 700 }}>{score}/{scenarios.length}</span> · Earned +{score * 40 + 50} XP</p>
            <div style={{ background: `${palette.accent2}22`, border: `1px solid ${palette.accent2}44`, borderRadius: 12, padding: 16, marginBottom: 24, color: palette.accent2, fontWeight: 600 }}>🎮 Badge Unlocked: Game Master!</div>
            <button onClick={() => { setPhase("play"); setRound(0); setScore(0); setChoice(null); setFeedback(null); }} style={{ background: palette.accent, border: "none", color: "#fff", padding: "12px 28px", borderRadius: 10, cursor: "pointer", fontSize: 15, fontWeight: 700 }}>Play Again</button>
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ color: palette.text, margin: 0, fontSize: 20, fontWeight: 800 }}>🎮 Algorithm Selector</h2>
              <div style={{ display: "flex", gap: 16, fontSize: 13, color: palette.muted }}>
                <span>Round {round + 1}/{scenarios.length}</span>
                <span style={{ color: "#F59E0B", fontWeight: 700 }}>⚡ {score * 40} XP</span>
              </div>
            </div>
            <div style={{ background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 16, padding: 28, boxShadow: "0 12px 30px rgba(7, 13, 26, 0.35)" }}>
              <div style={{ background: palette.bg, borderRadius: 12, padding: 20, marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: palette.accent, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>SCENARIO</div>
                <p style={{ margin: 0, fontSize: 17, color: palette.text, lineHeight: 1.6, fontWeight: 500 }}>{s.desc}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {s.options.map((opt, i) => {
                  let bg = palette.bg, border = palette.border, color = palette.textSoft;
                  if (choice !== null) {
                    if (i === s.ans) { bg = `${palette.accent2}22`; border = palette.accent2; color = palette.accent2; }
                    else if (i === choice && choice !== s.ans) { bg = "#E2484822"; border = "#E24848"; color = "#E24848"; }
                  }
                  return (
                    <div key={i} onClick={() => choice === null && pick(i)} style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 10, padding: "14px 18px", cursor: choice === null ? "pointer" : "default", fontSize: 15, color, fontWeight: 600, transition: "all 0.15s" }}>
                      {opt}
                    </div>
                  );
                })}
              </div>
              {feedback && (
                <div style={{ marginTop: 20, background: feedback.ok ? `${palette.accent2}11` : "#E2484811", border: `1px solid ${feedback.ok ? palette.accent2 : "#E24848"}44`, borderRadius: 10, padding: "14px 18px" }}>
                  <div style={{ fontWeight: 700, color: feedback.ok ? palette.accent2 : "#E24848", marginBottom: 6, fontSize: 14 }}>{feedback.ok ? "✓ Correct!" : "✗ Not quite"}</div>
                  <p style={{ margin: 0, fontSize: 14, color: palette.textSoft, lineHeight: 1.6 }}>{feedback.msg}</p>
                </div>
              )}
              {feedback && (
                <button onClick={next} style={{ marginTop: 16, background: palette.accent, border: "none", color: "#fff", padding: "13px 28px", borderRadius: 10, cursor: "pointer", fontSize: 15, fontWeight: 700, width: "100%" }}>
                  {round < scenarios.length - 1 ? "Next Scenario →" : "Finish Game"}
                </button>
              )}
            </div>
          </div>
        )
      ) : (
        speedPhase === "intro" ? (
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
            <div style={{ fontSize: 62, marginBottom: 14 }}>⚡</div>
            <h2 style={{ margin: "0 0 10px", color: palette.text, fontSize: 28, fontWeight: 800 }}>Speed Classifier</h2>
            <p style={{ margin: "0 0 22px", color: palette.textSoft, lineHeight: 1.7 }}>You get 12 seconds per challenge. Build streaks, protect your lives, and finish strong for bonus XP.</p>
            <div style={{ background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 14, padding: 20, marginBottom: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: palette.textSoft, fontSize: 13 }}>
                <span>Challenges: {speedScenarios.length}</span>
                <span>Lives: ❤️❤️❤️</span>
                <span>Time: 12s each</span>
              </div>
            </div>
            <button onClick={resetSpeed} style={{ background: palette.accent2, border: "none", color: "#07231d", padding: "13px 30px", borderRadius: 10, cursor: "pointer", fontSize: 15, fontWeight: 800 }}>Start Speed Run →</button>
          </div>
        ) : speedPhase === "done" ? (
          <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
            <div style={{ fontSize: 62, marginBottom: 14 }}>{speedLives > 0 ? "🔥" : "⌛"}</div>
            <h2 style={{ margin: "0 0 10px", color: palette.text, fontSize: 28, fontWeight: 800 }}>Speed Run Complete!</h2>
            <p style={{ color: palette.textSoft, margin: "0 0 8px" }}>Score: <span style={{ color: palette.accent2, fontWeight: 700 }}>{speedScore}/{speedScenarios.length}</span></p>
            <p style={{ color: palette.textSoft, margin: "0 0 20px" }}>Best streak: <span style={{ color: "#F59E0B", fontWeight: 700 }}>{bestStreak}</span> · Lives left: {Math.max(speedLives, 0)}</p>
            <div style={{ background: `${palette.accent2}14`, border: `1px solid ${palette.accent2}66`, borderRadius: 12, padding: 14, marginBottom: 20, color: palette.accent2, fontWeight: 700 }}>
              +{speedScore * 35 + (speedLives > 0 ? 80 : 30)} XP earned
            </div>
            <button onClick={resetSpeed} style={{ background: palette.accent2, border: "none", color: "#07231d", padding: "12px 28px", borderRadius: 10, cursor: "pointer", fontSize: 15, fontWeight: 800 }}>Play Again</button>
          </div>
        ) : (
          <div style={{ background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 16, padding: 24, boxShadow: "0 12px 30px rgba(7, 13, 26, 0.35)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
              <div style={{ color: palette.text, fontWeight: 700 }}>Round {speedRound + 1}/{speedScenarios.length}</div>
              <div style={{ color: palette.textSoft, fontSize: 13 }}>Lives: {"❤️".repeat(Math.max(speedLives, 0)) || "💀"}</div>
              <div style={{ color: "#F59E0B", fontWeight: 700, fontSize: 13 }}>Streak: {speedStreak}</div>
            </div>
            <div style={{ background: palette.bg, borderRadius: 10, height: 8, overflow: "hidden", marginBottom: 18 }}>
              <div style={{ width: `${timerPct}%`, height: 8, background: timerPct > 40 ? palette.accent2 : timerPct > 20 ? "#F59E0B" : "#E24848", transition: "width 0.9s linear" }} />
            </div>
            <div style={{ marginBottom: 18, color: palette.text, fontSize: 17, fontWeight: 600, lineHeight: 1.6 }}>{speedCurrent.desc}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {speedCurrent.options.map((opt, i) => {
                let bg = palette.bg, border = palette.border, color = palette.textSoft;
                if (speedChoice !== null) {
                  if (i === speedCurrent.ans) { bg = `${palette.accent2}22`; border = palette.accent2; color = palette.accent2; }
                  else if (i === speedChoice && speedChoice !== speedCurrent.ans) { bg = "#E2484822"; border = "#E24848"; color = "#E24848"; }
                }
                return (
                  <div key={i} onClick={() => speedChoice === null && handleSpeedAnswer(i)} style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 10, padding: "12px 14px", cursor: speedChoice === null ? "pointer" : "default", color, fontSize: 14, fontWeight: 600 }}>
                    {opt}
                  </div>
                );
              })}
            </div>
            {speedFeedback && (
              <div style={{ marginTop: 14, background: speedFeedback.ok ? `${palette.accent2}12` : "#E2484812", border: `1px solid ${speedFeedback.ok ? palette.accent2 : "#E24848"}66`, borderRadius: 10, padding: "10px 12px" }}>
                <div style={{ fontSize: 13, color: speedFeedback.ok ? palette.accent2 : "#E24848", fontWeight: 700 }}>{speedFeedback.ok ? "✓ Correct" : "✗ Incorrect"}</div>
                <div style={{ fontSize: 13, color: palette.textSoft, marginTop: 4 }}>{speedFeedback.msg}</div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}

function SimulatePage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const spamKeywords = ["win", "free", "prize", "click here", "offer", "limited", "urgent", "congratulations", "million", "cash", "lottery", "discount", "deal", "act now", "guaranteed"];

  const analyze = () => {
    setLoading(true);
    setTimeout(() => {
      const lower = text.toLowerCase();
      const hits = spamKeywords.filter(k => lower.includes(k));
      const score = Math.min(100, hits.length * 20 + (text.length > 200 ? 10 : 0) + (text.includes("!") ? 5 : 0));
      setResult({ score, hits, isSpam: score >= 40 });
      setLoading(false);
    }, 600);
  };

  return (
    <div style={{ padding: "32px", maxWidth: 760, margin: "0 auto" }}>
      <h2 style={{ color: palette.text, margin: "0 0 8px", fontSize: 26, fontWeight: 800 }}>🔬 Real-World Simulation</h2>
      <p style={{ color: palette.textSoft, margin: "0 0 28px", fontSize: 15 }}>Try a spam detection model. Enter any email text and see how a simple classifier works.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div>
          <div style={{ background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: palette.muted, letterSpacing: 1, marginBottom: 12 }}>EMAIL CONTENT</div>
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste or type an email here..." rows={8} style={{ width: "100%", background: palette.bg, border: `1px solid ${palette.border}`, borderRadius: 10, padding: "12px 14px", color: palette.text, fontSize: 14, lineHeight: 1.6, resize: "vertical", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
            <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
              <button onClick={() => setText("Congratulations! You've won a FREE prize! Click here NOW to claim your $1,000,000 lottery winnings. Limited time offer — act now!")} style={{ background: `#E2484822`, border: "1px solid #E24848", color: "#E24848", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Load spam</button>
              <button onClick={() => setText("Hi Team, just following up on the project update from yesterday's meeting. Please review the attached document and share your feedback by Friday.")} style={{ background: `${palette.accent2}22`, border: `1px solid ${palette.accent2}`, color: palette.accent2, padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Load legitimate</button>
            </div>
            <button onClick={analyze} disabled={!text.trim()} style={{ marginTop: 14, background: text.trim() ? palette.accent : palette.border, border: "none", color: text.trim() ? "#fff" : palette.muted, padding: "12px 24px", borderRadius: 10, cursor: text.trim() ? "pointer" : "default", fontSize: 15, fontWeight: 700, width: "100%" }}>
              {loading ? "Analyzing..." : "Analyze →"}
            </button>
          </div>
        </div>
        <div>
          {result ? (
            <div style={{ background: palette.card, border: `1.5px solid ${result.isSpam ? "#E24848" : palette.accent2}`, borderRadius: 14, padding: 24 }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 48, marginBottom: 8 }}>{result.isSpam ? "🚨" : "✅"}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: result.isSpam ? "#E24848" : palette.accent2 }}>{result.isSpam ? "SPAM DETECTED" : "LEGITIMATE EMAIL"}</div>
                <div style={{ fontSize: 13, color: palette.muted, marginTop: 4 }}>Confidence: {result.score}%</div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: palette.muted, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>SPAM SCORE</div>
                <div style={{ background: palette.bg, borderRadius: 8, height: 10, overflow: "hidden" }}>
                  <div style={{ height: 10, width: `${result.score}%`, background: result.score > 60 ? "#E24848" : result.score > 30 ? "#F59E0B" : palette.accent2, borderRadius: 8, transition: "width 0.5s" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: palette.muted, marginTop: 4 }}>
                  <span>Safe</span><span>Spam</span>
                </div>
              </div>
              {result.hits.length > 0 && (
                <div>
                  <div style={{ fontSize: 12, color: palette.muted, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>FLAGGED KEYWORDS</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {result.hits.map(h => (
                      <span key={h} style={{ background: "#E2484822", border: "1px solid #E2484844", color: "#E24848", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{h}</span>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ marginTop: 20, background: palette.bg, borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 12, color: palette.muted, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>HOW IT WORKS</div>
                <p style={{ margin: 0, fontSize: 13, color: palette.textSoft, lineHeight: 1.6 }}>This simulates a Naive Bayes classifier. It scores based on presence of known spam keywords, message length heuristics, and punctuation patterns — a simplified version of real spam filters.</p>
              </div>
            </div>
          ) : (
            <div style={{ background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 14, padding: 24, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: 300 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔬</div>
              <p style={{ color: palette.muted, fontSize: 14 }}>Enter email text and click Analyze to see the simulation results here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProgrammingPracticePage() {
  const [code, setCode] = useState(`# Write Python code here\nprint("Hello AIML Lab!")`);
  const [pythonOutput, setPythonOutput] = useState("Python output will appear here.");
  const [syntaxMessage, setSyntaxMessage] = useState("No syntax check run yet.");
  const [runtimeState, setRuntimeState] = useState("loading");
  const [isRunning, setIsRunning] = useState(false);
  const pyodideRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const loadRuntime = async () => {
      try {
        if (window.__aimlPyodideRuntime) {
          pyodideRef.current = window.__aimlPyodideRuntime;
          if (mounted) setRuntimeState("ready");
          return;
        }

        if (!window.loadPyodide) {
          await new Promise((resolve, reject) => {
            const existingScript = document.querySelector(`script[src="${PYODIDE_CDN}"]`);
            if (existingScript) {
              existingScript.addEventListener("load", resolve, { once: true });
              existingScript.addEventListener("error", () => reject(new Error("Unable to load Pyodide script.")), { once: true });
              return;
            }

            const script = document.createElement("script");
            script.src = PYODIDE_CDN;
            script.async = true;
            script.onload = resolve;
            script.onerror = () => reject(new Error("Unable to load Pyodide script."));
            document.body.appendChild(script);
          });
        }

        const pyodide = await window.loadPyodide();
        window.__aimlPyodideRuntime = pyodide;
        pyodideRef.current = pyodide;
        if (mounted) setRuntimeState("ready");
      } catch (err) {
        if (mounted) {
          setRuntimeState("error");
          setPythonOutput(`Runtime error: ${err.message}`);
        }
      }
    };

    loadRuntime();
    return () => {
      mounted = false;
    };
  }, []);

  const checkSyntax = async () => {
    if (!pyodideRef.current) {
      setSyntaxMessage("Python runtime is not ready yet. Please wait a moment.");
      return false;
    }

    try {
      pyodideRef.current.globals.set("user_code", code);
      const syntaxResult = await pyodideRef.current.runPythonAsync(`
import ast
import traceback
try:
    ast.parse(user_code)
    syntax_result = "__SYNTAX_OK__"
except Exception:
    syntax_result = traceback.format_exc()
syntax_result
      `);

      if (String(syntaxResult).trim() === "__SYNTAX_OK__") {
        setSyntaxMessage("Syntax OK");
        return true;
      }

      setSyntaxMessage(String(syntaxResult));
      return false;
    } catch (err) {
      setSyntaxMessage(`Syntax check failed: ${err.message}`);
      return false;
    }
  };

  const runPythonCode = async () => {
    if (!pyodideRef.current) {
      setPythonOutput("Python runtime is not ready yet. Please wait a moment.");
      return;
    }

    setIsRunning(true);
    try {
      const isSyntaxValid = await checkSyntax();
      if (!isSyntaxValid) {
        setPythonOutput("Execution skipped due to syntax error.");
        return;
      }

      pyodideRef.current.globals.set("user_code", code);
      const output = await pyodideRef.current.runPythonAsync(`
import io
import traceback
from contextlib import redirect_stdout, redirect_stderr

stdout_buffer = io.StringIO()
stderr_buffer = io.StringIO()

try:
    with redirect_stdout(stdout_buffer), redirect_stderr(stderr_buffer):
        exec(user_code, {})
except Exception:
    traceback.print_exc(file=stderr_buffer)

combined = stdout_buffer.getvalue()
if stderr_buffer.getvalue():
    if combined:
        combined += "\\n"
    combined += stderr_buffer.getvalue()

combined if combined.strip() else "Program ran successfully with no output."
      `);

      setPythonOutput(String(output));
    } catch (err) {
      setPythonOutput(`Execution failed: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div style={{ padding: "32px", maxWidth: 980, margin: "0 auto" }}>
      <h2 style={{ color: palette.text, margin: "0 0 8px", fontSize: 28, fontWeight: 800 }}>💻 Programming Practice</h2>
      <p style={{ color: palette.textSoft, margin: "0 0 22px", fontSize: 15, lineHeight: 1.6 }}>
        Write any Python code, validate syntax, run it, and view output instantly.
      </p>
      <div style={{ background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 14, padding: 20 }}>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={14}
          style={{
            width: "100%",
            background: "#0a0f1d",
            color: "#d2e5ff",
            border: `1px solid ${palette.border}`,
            borderRadius: 10,
            padding: "12px 13px",
            fontFamily: "Consolas, Menlo, monospace",
            fontSize: 13,
            lineHeight: 1.6,
            outline: "none",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />

        <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          <button onClick={checkSyntax} disabled={runtimeState !== "ready"} style={{ background: runtimeState === "ready" ? palette.accent : palette.border, border: "none", color: runtimeState === "ready" ? "#fff" : palette.muted, padding: "10px 16px", borderRadius: 9, fontWeight: 700, cursor: runtimeState === "ready" ? "pointer" : "default" }}>
            Check Syntax
          </button>
          <button onClick={runPythonCode} disabled={runtimeState !== "ready" || isRunning} style={{ background: runtimeState === "ready" ? palette.accent2 : palette.border, border: "none", color: runtimeState === "ready" ? "#05221a" : palette.muted, padding: "10px 16px", borderRadius: 9, fontWeight: 700, cursor: runtimeState === "ready" ? "pointer" : "default" }}>
            {isRunning ? "Running..." : "Run Python"}
          </button>
          <button onClick={() => setPythonOutput("Output cleared.")} style={{ background: "transparent", border: `1px solid ${palette.border}`, color: palette.textSoft, padding: "10px 16px", borderRadius: 9, cursor: "pointer" }}>
            Clear Output
          </button>
        </div>

        <div style={{ marginTop: 12, background: "#111b2d", border: `1px solid ${palette.border}`, borderRadius: 10, padding: "10px 12px" }}>
          <div style={{ color: palette.muted, fontSize: 11, fontWeight: 700, marginBottom: 4 }}>SYNTAX STATUS</div>
          <pre style={{ margin: 0, color: syntaxMessage === "Syntax OK" ? palette.accent2 : "#fca5a5", fontSize: 12, lineHeight: 1.5, whiteSpace: "pre-wrap", fontFamily: "Consolas, Menlo, monospace" }}>
            {syntaxMessage}
          </pre>
        </div>

        <div style={{ marginTop: 12, background: "#0a0f1d", border: `1px solid ${palette.border}`, borderRadius: 10, padding: "10px 12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <div style={{ color: palette.muted, fontSize: 11, fontWeight: 700 }}>PYTHON CONSOLE</div>
            <div style={{ fontSize: 11, color: runtimeState === "ready" ? palette.accent2 : runtimeState === "error" ? "#f87171" : palette.muted }}>
              {runtimeState === "ready" ? "Runtime ready" : runtimeState === "error" ? "Runtime failed" : "Loading runtime..."}
            </div>
          </div>
          <pre style={{ margin: 0, color: "#c6dcff", fontSize: 12, lineHeight: 1.6, whiteSpace: "pre-wrap", minHeight: 90, fontFamily: "Consolas, Menlo, monospace" }}>
            {pythonOutput}
          </pre>
        </div>
      </div>
    </div>
  );
}

function DashboardPage({ completedModules, totalXp, earnedBadges }) {
  const pct = Math.round((completedModules.length / modules.length) * 100);
  const lb = leaderboard.map(l => l.isMe ? { ...l, xp: totalXp } : l).sort((a, b) => b.xp - a.xp);

  return (
    <div style={{ padding: "32px", maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ color: palette.text, margin: "0 0 24px", fontSize: 26, fontWeight: 800 }}>📊 Your Dashboard</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Total XP", value: totalXp, icon: "⚡", color: "#F59E0B" },
          { label: "Modules Done", value: `${completedModules.length}/${modules.length}`, icon: "📚", color: palette.accent },
          { label: "Badges", value: `${earnedBadges.length}/${badges.length}`, icon: "🏅", color: palette.accent2 },
          { label: "Progress", value: `${pct}%`, icon: "📈", color: "#A855F7" },
        ].map(s => (
          <div key={s.label} style={{ background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 12, padding: "18px 20px" }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: palette.muted, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 28 }}>
        <div style={{ background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 14, padding: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: palette.muted, letterSpacing: 1, marginBottom: 16 }}>MODULE PROGRESS</div>
          {modules.map(m => (
            <div key={m.id} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: palette.textSoft }}>{m.icon} {m.title}</span>
                <span style={{ color: completedModules.includes(m.id) ? palette.accent2 : palette.muted, fontSize: 12, fontWeight: 700 }}>{completedModules.includes(m.id) ? "✓ Done" : "Pending"}</span>
              </div>
              <div style={{ background: palette.bg, borderRadius: 4, height: 5 }}>
                <div style={{ background: m.color, width: completedModules.includes(m.id) ? "100%" : "0%", height: 5, borderRadius: 4, transition: "width 0.5s" }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 14, padding: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: palette.muted, letterSpacing: 1, marginBottom: 16 }}>🏆 LEADERBOARD</div>
          {lb.map((u, i) => (
            <div key={u.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: u.isMe ? `${palette.accent}15` : "transparent", border: u.isMe ? `1px solid ${palette.accent}33` : "1px solid transparent", borderRadius: 8, marginBottom: 6 }}>
              <div style={{ width: 24, fontSize: 14, textAlign: "center" }}>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}</div>
              <div style={{ flex: 1, fontSize: 14, color: u.isMe ? palette.accent : palette.text, fontWeight: u.isMe ? 700 : 400 }}>{u.name}{u.isMe ? " (You)" : ""}</div>
              <div style={{ fontSize: 13, color: "#F59E0B", fontWeight: 700 }}>⚡ {u.xp}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 14, padding: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: palette.muted, letterSpacing: 1, marginBottom: 16 }}>🏅 BADGES</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
          {badges.map(b => {
            const earned = earnedBadges.includes(b.id);
            return (
              <div key={b.id} style={{ background: earned ? `${palette.accent2}11` : palette.bg, border: `1px solid ${earned ? palette.accent2 + "44" : palette.border}`, borderRadius: 12, padding: 16, textAlign: "center", opacity: earned ? 1 : 0.4 }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{b.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: earned ? palette.text : palette.muted, marginBottom: 4 }}>{b.label}</div>
                <div style={{ fontSize: 11, color: palette.muted }}>{b.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("home");
  const [completedModules, setCompletedModules] = useState([]);
  const [totalXp, setTotalXp] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem(AUTH_SESSION_KEY) || "null");
      if (session?.email) {
        setAuthUser(session);
      }
    } catch {
      setAuthUser(null);
    }
  }, []);

  const handleAuthSuccess = (user) => {
    setAuthUser(user);
    setActive("home");
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_SESSION_KEY);
    setAuthUser(null);
    setActive("home");
    setCompletedModules([]);
    setTotalXp(0);
    setEarnedBadges([]);
  };

  return (
    <div style={{ background: `radial-gradient(circle at 15% -10%, #1f3f7b 0%, rgba(31, 63, 123, 0) 40%), radial-gradient(circle at 90% 10%, #154f62 0%, rgba(21, 79, 98, 0) 35%), ${palette.bg}`, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", color: palette.text, position: "relative", overflowX: "hidden" }}>
      <div aria-hidden="true" style={{ position: "fixed", top: -120, left: -90, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(79, 142, 247, 0.24), rgba(79, 142, 247, 0))", filter: "blur(8px)", pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden="true" style={{ position: "fixed", bottom: -140, right: -120, width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(34, 211, 165, 0.2), rgba(34, 211, 165, 0))", filter: "blur(12px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        {authUser ? (
          <>
            <NavBar active={active} setActive={setActive} user={authUser} onLogout={handleLogout} />
            {active === "home" && <HomePage setActive={setActive} completedModules={completedModules} totalXp={totalXp} />}
            {active === "learn" && <LearnPage completedModules={completedModules} setCompletedModules={setCompletedModules} setTotalXp={setTotalXp} />}
            {active === "code" && <ProgrammingPracticePage />}
            {active === "quiz" && <QuizPage earnedBadges={earnedBadges} setEarnedBadges={setEarnedBadges} setTotalXp={setTotalXp} />}
            {active === "game" && <GamePage earnedBadges={earnedBadges} setEarnedBadges={setEarnedBadges} setTotalXp={setTotalXp} />}
            {active === "simulate" && <SimulatePage />}
            {active === "dashboard" && <DashboardPage completedModules={completedModules} totalXp={totalXp} earnedBadges={earnedBadges} />}
          </>
        ) : (
          <AuthPage onAuthSuccess={handleAuthSuccess} />
        )}
      </div>
    </div>
  );
}
