import { useState, useEffect, useRef } from "react";

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

function NavBar({ active, setActive }) {
  const navs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "learn", label: "Learn", icon: "📚" },
    { id: "quiz", label: "Quiz", icon: "✏️" },
    { id: "game", label: "Mini-Game", icon: "🎮" },
    { id: "simulate", label: "Simulate", icon: "🔬" },
    { id: "dashboard", label: "Dashboard", icon: "📊" },
  ];
  return (
    <nav style={{ background: palette.surface, borderBottom: `1px solid ${palette.border}`, padding: "0 24px", display: "flex", alignItems: "center", gap: 4, position: "sticky", top: 0, zIndex: 50, flexWrap: "wrap" }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: palette.accent, marginRight: 24, padding: "12px 0", letterSpacing: -0.5 }}>
        AIML<span style={{ color: palette.accent2 }}>Lab</span>
      </div>
      {navs.map(n => (
        <button key={n.id} onClick={() => setActive(n.id)} style={{ background: active === n.id ? `${palette.accent}22` : "transparent", border: "none", color: active === n.id ? palette.accent : palette.textSoft, padding: "10px 14px", cursor: "pointer", borderRadius: 8, fontSize: 13, fontWeight: active === n.id ? 600 : 400, display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s" }}>
          <span style={{ fontSize: 14 }}>{n.icon}</span>{n.label}
        </button>
      ))}
    </nav>
  );
}

function HomePage({ setActive, completedModules, totalXp }) {
  return (
    <div style={{ padding: "48px 32px", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "inline-block", background: `${palette.accent}22`, border: `1px solid ${palette.accent}44`, borderRadius: 20, padding: "4px 16px", fontSize: 12, color: palette.accent, marginBottom: 16, fontWeight: 600, letterSpacing: 1 }}>VIBETHON 2025 · AIML PLATFORM</div>
        <h1 style={{ fontSize: 48, fontWeight: 800, color: palette.text, margin: "0 0 16px", lineHeight: 1.1, letterSpacing: -1.5 }}>Learn AI & ML<br /><span style={{ background: `linear-gradient(90deg, ${palette.accent}, ${palette.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>by doing, not reading.</span></h1>
        <p style={{ fontSize: 17, color: palette.textSoft, lineHeight: 1.7, maxWidth: 560, margin: "0 0 32px" }}>Structured modules, hands-on quizzes, mini-games, and real-world simulations — all in one platform. Go from zero to building AI intuitively.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={() => setActive("learn")} style={{ background: palette.accent, border: "none", color: "#fff", padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Start Learning →</button>
          <button onClick={() => setActive("game")} style={{ background: "transparent", border: `1.5px solid ${palette.border}`, color: palette.text, padding: "14px 28px", borderRadius: 10, fontSize: 15, cursor: "pointer" }}>Try Mini-Game 🎮</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 48 }}>
        {[
          { label: "Modules", value: `${completedModules.length}/${modules.length}`, icon: "📚", color: palette.accent },
          { label: "XP Earned", value: totalXp, icon: "⚡", color: "#F59E0B" },
          { label: "Topics", value: "10+", icon: "🧠", color: palette.accent2 },
          { label: "Mini-Games", value: "3", icon: "🎮", color: "#EC4899" },
        ].map(s => (
          <div key={s.label} style={{ background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 12, padding: "20px 24px" }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: palette.muted, marginTop: 4 }}>{s.label}</div>
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
  const [phase, setPhase] = useState("intro");
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [choice, setChoice] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const scenarios = [
    { desc: "You want to detect cats vs dogs in photos. Which approach?", options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning"], ans: 0, explain: "We have labeled images, making this a supervised classification problem." },
    { desc: "Find hidden customer groups without predefined categories.", options: ["Linear Regression", "Clustering (Unsupervised)", "Decision Tree"], ans: 1, explain: "Without labels, we use clustering to discover natural groupings." },
    { desc: "Predict tomorrow's temperature based on historical data.", options: ["Classification", "Regression", "Clustering"], ans: 1, explain: "Predicting a continuous value (temperature) is a regression task." },
    { desc: "Train a robot to walk by rewarding good movements.", options: ["Supervised Learning", "Clustering", "Reinforcement Learning"], ans: 2, explain: "Learning through reward signals defines reinforcement learning." },
    { desc: "Translate an English sentence to French.", options: ["Transformer/NLP", "Random Forest", "K-Means"], ans: 0, explain: "Sequence-to-sequence translation is a core NLP/Transformer task." },
  ];

  const s = scenarios[round];

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

  if (phase === "intro") return (
    <div style={{ padding: 48, maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎮</div>
      <h2 style={{ color: palette.text, fontSize: 28, fontWeight: 800, margin: "0 0 12px" }}>Algorithm Selector</h2>
      <p style={{ color: palette.textSoft, fontSize: 16, margin: "0 0 28px", lineHeight: 1.7 }}>You'll be presented with real-world ML problems. Choose the right algorithm type! Each correct answer earns XP.</p>
      <div style={{ background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 12, padding: 20, marginBottom: 28, textAlign: "left" }}>
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
  );

  if (phase === "done") return (
    <div style={{ padding: 48, maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>{score >= 4 ? "🏆" : score >= 2 ? "🎯" : "📚"}</div>
      <h2 style={{ color: palette.text, fontSize: 28, fontWeight: 800, margin: "0 0 8px" }}>Game Over!</h2>
      <p style={{ color: palette.textSoft, margin: "0 0 24px" }}>Score: <span style={{ color: palette.accent, fontWeight: 700 }}>{score}/{scenarios.length}</span> · Earned +{score * 40 + 50} XP</p>
      <div style={{ background: `${palette.accent2}22`, border: `1px solid ${palette.accent2}44`, borderRadius: 12, padding: 16, marginBottom: 24, color: palette.accent2, fontWeight: 600 }}>🎮 Badge Unlocked: Game Master!</div>
      <button onClick={() => { setPhase("play"); setRound(0); setScore(0); setChoice(null); setFeedback(null); }} style={{ background: palette.accent, border: "none", color: "#fff", padding: "12px 28px", borderRadius: 10, cursor: "pointer", fontSize: 15, fontWeight: 700 }}>Play Again</button>
    </div>
  );

  return (
    <div style={{ padding: "32px", maxWidth: 680, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ color: palette.text, margin: 0, fontSize: 20, fontWeight: 800 }}>🎮 Algorithm Selector</h2>
        <div style={{ display: "flex", gap: 16, fontSize: 13, color: palette.muted }}>
          <span>Round {round + 1}/{scenarios.length}</span>
          <span style={{ color: "#F59E0B", fontWeight: 700 }}>⚡ {score * 40} XP</span>
        </div>
      </div>
      <div style={{ background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 16, padding: 28 }}>
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

  return (
    <div style={{ background: palette.bg, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", color: palette.text }}>
      <NavBar active={active} setActive={setActive} />
      {active === "home" && <HomePage setActive={setActive} completedModules={completedModules} totalXp={totalXp} />}
      {active === "learn" && <LearnPage completedModules={completedModules} setCompletedModules={setCompletedModules} setTotalXp={setTotalXp} />}
      {active === "quiz" && <QuizPage earnedBadges={earnedBadges} setEarnedBadges={setEarnedBadges} setTotalXp={setTotalXp} />}
      {active === "game" && <GamePage earnedBadges={earnedBadges} setEarnedBadges={setEarnedBadges} setTotalXp={setTotalXp} />}
      {active === "simulate" && <SimulatePage />}
      {active === "dashboard" && <DashboardPage completedModules={completedModules} totalXp={totalXp} earnedBadges={earnedBadges} />}
    </div>
  );
}
