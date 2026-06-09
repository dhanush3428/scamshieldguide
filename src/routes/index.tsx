import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Shield, ShieldCheck, ShieldAlert, AlertTriangle, Search, Menu, X,
  Link2Off, Smartphone, QrCode, Lock, Eye, Phone, Wallet, Users,
  Database, ScanLine, ListChecks, BookOpen, Megaphone, BarChart3,
  ArrowRight, ExternalLink, Send, Sparkles, FileWarning, CheckCircle2,
  AlertCircle, XCircle, Mail, Github,
} from "lucide-react";
import scamsData from "@/data/scams.json";
import tipsData from "@/data/tips.json";
import articlesData from "@/data/articles.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ScamShield.in — Stay Safe From Online Scams in India" },
      { name: "description", content: "ScamShield.in helps Indians identify and avoid online scams. Analyze suspicious messages, browse a scam database, and learn cyber safety tips." },
      { property: "og:title", content: "ScamShield.in — Stay Safe From Online Scams" },
      { property: "og:description", content: "Free cybersecurity awareness platform for Indian users. Analyze scams, learn safety tips, and report fraud." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const iconMap: Record<string, any> = {
  ShieldCheck, Link2Off, Smartphone, Search, QrCode, Lock, Eye, Phone, Wallet, Users,
};

const severityStyles: Record<string, string> = {
  Low: "bg-[oklch(0.68_0.18_150/0.15)] text-[oklch(0.85_0.18_150)] border-[oklch(0.68_0.18_150/0.3)]",
  Medium: "bg-[oklch(0.8_0.16_80/0.15)] text-[oklch(0.85_0.16_80)] border-[oklch(0.8_0.16_80/0.3)]",
  High: "bg-[oklch(0.62_0.24_25/0.15)] text-[oklch(0.78_0.22_25)] border-[oklch(0.62_0.24_25/0.35)]",
};

function Home() {
  return (
    <div className="dark min-h-screen text-foreground">
      <Nav />
      <Hero />
      <Stats />
      <Analyzer />
      <ScamDatabase />
      <Verifier />
      <Tips />
      <Articles />
      <CommunityReports />
      <OfficialHelp />
      <Footer />
      <Toaster theme="dark" position="top-right" />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#analyzer", label: "Analyzer" },
    { href: "#database", label: "Database" },
    { href: "#verify", label: "Verify" },
    { href: "#tips", label: "Tips" },
    { href: "#articles", label: "Articles" },
    { href: "#report", label: "Report" },
    { href: "#help", label: "Help" },
  ];
  return (
    <header className="sticky top-0 z-50 glass border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <div className="relative">
            <Shield className="w-7 h-7 text-primary" strokeWidth={2.5} />
            <div className="absolute inset-0 blur-md bg-primary/40 -z-10 group-hover:bg-primary/60 transition" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            Scam<span className="text-primary">Shield</span>
            <span className="text-muted-foreground text-sm">.in</span>
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition rounded-md hover:bg-white/5">
              {l.label}
            </a>
          ))}
          <Button asChild size="sm" className="ml-2 bg-primary hover:bg-primary/90 shadow-[var(--shadow-glow)]">
            <a href="#analyzer">Analyze Now</a>
          </Button>
        </nav>
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border glass">
          <div className="px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="px-3 py-3 text-sm rounded-md hover:bg-white/5">{l.label}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden grid-bg">
      <div className="absolute inset-0 bg-[var(--gradient-hero)] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-24 lg:pt-28 lg:pb-36">
        <div className="max-w-3xl">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/30 hover:bg-primary/15">
            <Sparkles className="w-3 h-3 mr-1.5" /> Made for Indian internet users
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Stay Safe From <br className="hidden sm:block" />
            <span className="gradient-text glow-text">Online Scams</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            ScamShield.in helps students, job seekers, families and senior citizens recognize fraud
            before it happens. Analyze any suspicious message, browse India's most common scams, and
            learn how to protect what matters.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-glow)] h-12 px-6">
              <a href="#analyzer"><ScanLine className="w-4 h-4 mr-2" /> Analyze a Message</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border bg-white/5 hover:bg-white/10 h-12 px-6">
              <a href="#database"><Database className="w-4 h-4 mr-2" /> Browse Scam Database</a>
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[oklch(0.7_0.18_150)]" /> 100% Free</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[oklch(0.7_0.18_150)]" /> No Sign-up</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[oklch(0.7_0.18_150)]" /> Private</div>
          </div>
        </div>
        {/* Floating decorative card */}
        <div className="hidden lg:block absolute right-6 top-32 w-80 glass rounded-2xl p-5 animate-pulse-glow rotate-2">
          <div className="flex items-center gap-2 mb-3 text-primary">
            <FileWarning className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-wider">Detected</span>
          </div>
          <p className="text-sm text-muted-foreground font-mono leading-relaxed">
            "Dear customer, your KYC expires today. Click bit.ly/upd-kyc to avoid blockage."
          </p>
          <div className="mt-4 flex items-center justify-between">
            <Badge className={severityStyles.High + " border"}>HIGH RISK</Badge>
            <span className="text-xs text-muted-foreground font-mono">4 red flags</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- STATS ---------------- */
function useCounter(target: number, duration = 1500) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            setVal(Math.floor(p * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    io.observe(node);
    return () => io.disconnect();
  }, [target, duration]);
  return { val, ref };
}

function StatCard({ value, label, icon: Icon }: { value: number; label: string; icon: any }) {
  const { val, ref } = useCounter(value);
  return (
    <div ref={ref} className="glass rounded-2xl p-6 sm:p-8 relative overflow-hidden group">
      <Icon className="w-8 h-8 text-primary mb-4" />
      <div className="font-display text-4xl sm:text-5xl font-bold tracking-tight">{val.toLocaleString("en-IN")}+</div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition" />
    </div>
  );
}

function Stats() {
  const reports = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("scamshield_reports") || "[]").length : 0;
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 -mt-12 relative z-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard value={scamsData.length} label="Scam Types Tracked" icon={Database} />
        <StatCard value={tipsData.length} label="Cyber Safety Tips" icon={ShieldCheck} />
        <StatCard value={articlesData.length} label="Awareness Articles" icon={BookOpen} />
        <StatCard value={Math.max(reports, 247)} label="Community Reports" icon={Megaphone} />
      </div>
    </section>
  );
}

/* ---------------- ANALYZER ---------------- */
const HIGH_KEYWORDS = ["otp", "pin", "cvv", "kyc", "blocked", "suspend", "arrest", "cbi", "police", "anydesk", "teamviewer", "verify account", "click here", "bit.ly", "tinyurl", "urgent", "immediate", "lottery", "winner", "prize", "refund", "customs", "fedex", "parcel", "drugs", "money laundering"];
const MED_KEYWORDS = ["congratulations", "selected", "loan approved", "free", "limited time", "offer", "discount", "gift", "claim", "register", "fee", "deposit", "guarantee", "double your money", "investment", "vip group", "whatsapp +92"];
const URL_PATTERN = /(https?:\/\/[^\s]+)|(bit\.ly|tinyurl|goo\.gl|t\.co)/i;

function Analyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<null | { score: number; level: "Low" | "Medium" | "High"; reasons: string[] }>(null);

  const analyze = () => {
    if (!text.trim()) { toast.error("Please paste a message to analyze"); return; }
    const lower = text.toLowerCase();
    const reasons: string[] = [];
    let score = 0;
    HIGH_KEYWORDS.forEach((k) => {
      if (lower.includes(k)) { score += 2; reasons.push(`Contains high-risk keyword: "${k}"`); }
    });
    MED_KEYWORDS.forEach((k) => {
      if (lower.includes(k)) { score += 1; reasons.push(`Contains suspicious keyword: "${k}"`); }
    });
    if (URL_PATTERN.test(text)) { score += 2; reasons.push("Contains a URL or shortened link — verify carefully"); }
    if (/[A-Z]{4,}/.test(text)) { score += 0.5; reasons.push("Excessive use of CAPITAL LETTERS — common in scams"); }
    if (/₹\s?\d{3,}/.test(text) || /rs\.?\s?\d{3,}/i.test(text)) { score += 1; reasons.push("Mentions a specific monetary amount"); }
    if (/\+92|\+234|\+1\s?\d{3}/.test(text)) { score += 2; reasons.push("Contains a suspicious international phone code"); }

    const unique = Array.from(new Set(reasons)).slice(0, 8);
    const level: "Low" | "Medium" | "High" = score >= 5 ? "High" : score >= 2 ? "Medium" : "Low";
    if (unique.length === 0) unique.push("No common scam indicators found. Still, verify the sender independently.");
    setResult({ score, level, reasons: unique });
  };

  const levelMeta = {
    Low: { color: "oklch(0.68 0.18 150)", label: "Low Risk", icon: CheckCircle2, msg: "Looks relatively safe — but always stay alert." },
    Medium: { color: "oklch(0.8 0.16 80)", label: "Medium Risk", icon: AlertCircle, msg: "Be careful. Verify with the sender through a known channel before acting." },
    High: { color: "oklch(0.62 0.24 25)", label: "High Risk", icon: XCircle, msg: "Likely a scam. Do not click links, share OTP, or transfer money." },
  };

  return (
    <section id="analyzer" className="py-20 lg:py-28 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Message Analyzer"
          title="Paste any suspicious message"
          subtitle="SMS, WhatsApp, email or URL — we'll scan for India-specific scam patterns instantly. Nothing leaves your browser."
        />
        <div className="grid lg:grid-cols-5 gap-6 mt-12">
          <div className="lg:col-span-3 glass rounded-2xl p-5 sm:p-7">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground font-mono">Suspicious content</Label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. Dear Customer, your SBI account will be blocked. Click bit.ly/sbi-kyc to update KYC immediately."
              className="mt-3 min-h-48 bg-background/40 border-border resize-none font-mono text-sm"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={analyze} className="bg-primary hover:bg-primary/90 shadow-[var(--shadow-glow)]">
                <ScanLine className="w-4 h-4 mr-2" /> Analyze Message
              </Button>
              <Button variant="outline" onClick={() => { setText(""); setResult(null); }} className="border-border bg-white/5">
                Clear
              </Button>
              <Button variant="ghost" onClick={() => setText("Congratulations! You won ₹25 lakh in KBC lottery. Pay ₹8500 GST to claim. Click bit.ly/kbc-claim URGENT")} className="text-xs text-muted-foreground">
                Try example
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2">
            {!result ? (
              <div className="glass rounded-2xl p-7 h-full flex flex-col items-center justify-center text-center min-h-72">
                <div className="relative">
                  <ScanLine className="w-12 h-12 text-muted-foreground/40" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Results will appear here after analysis.</p>
              </div>
            ) : (
              <div className="glass rounded-2xl p-7 animate-float-up" style={{ borderColor: levelMeta[result.level].color + "55" }}>
                <div className="flex items-center gap-3">
                  {(() => { const I = levelMeta[result.level].icon; return <I className="w-6 h-6" style={{ color: levelMeta[result.level].color }} />; })()}
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground font-mono">Verdict</div>
                    <div className="font-display text-2xl font-bold" style={{ color: levelMeta[result.level].color }}>
                      {levelMeta[result.level].label}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{levelMeta[result.level].msg}</p>
                <div className="mt-5 pt-5 border-t border-border">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-3">Warning signs</div>
                  <ul className="space-y-2">
                    {result.reasons.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <AlertTriangle className="w-3.5 h-3.5 mt-1 text-primary shrink-0" />
                        <span className="text-foreground/90">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SCAM DATABASE ---------------- */
function ScamDatabase() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [sev, setSev] = useState("all");

  const categories = useMemo(() => ["all", ...Array.from(new Set(scamsData.map((s) => s.category)))], []);
  const filtered = scamsData.filter((s) => {
    const matchQ = !q || (s.title + s.description + s.category).toLowerCase().includes(q.toLowerCase());
    const matchC = cat === "all" || s.category === cat;
    const matchS = sev === "all" || s.severity === sev;
    return matchQ && matchC && matchS;
  });

  return (
    <section id="database" className="py-20 lg:py-28 scroll-mt-16 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Scam Database"
          title="Know the playbook"
          subtitle={`${scamsData.length} verified scam patterns active in India — search, filter, and learn the red flags.`}
        />
        <div className="mt-10 glass rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search scams, keywords, categories…"
              className="pl-9 bg-background/40 border-border" />
          </div>
          <Select value={cat} onValueChange={setCat}>
            <SelectTrigger className="lg:w-56 bg-background/40 border-border"><SelectValue /></SelectTrigger>
            <SelectContent>
              {categories.map((c) => <SelectItem key={c} value={c}>{c === "all" ? "All Categories" : c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={sev} onValueChange={setSev}>
            <SelectTrigger className="lg:w-44 bg-background/40 border-border"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <article key={s.id} className="glass rounded-2xl p-5 sm:p-6 flex flex-col group hover:border-primary/40 transition relative overflow-hidden">
              <div className="flex items-start justify-between gap-3">
                <Badge variant="outline" className="border-border bg-white/5 text-muted-foreground text-xs">{s.category}</Badge>
                <Badge className={severityStyles[s.severity] + " border text-xs"}>{s.severity}</Badge>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold leading-tight">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              <div className="mt-4 p-3 rounded-lg bg-background/40 border border-border/60">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono mb-1">Real example</div>
                <p className="text-xs italic text-foreground/80 leading-relaxed">"{s.example}"</p>
              </div>
              <div className="mt-4">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono mb-2">Red flags</div>
                <div className="flex flex-wrap gap-1.5">
                  {s.redFlags.map((f) => (
                    <span key={f} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary/90 border border-primary/20">{f}</span>
                  ))}
                </div>
              </div>
              <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/15 transition" />
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-muted-foreground">
              No scams match your filters.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- VERIFIER ---------------- */
const QUESTIONS = [
  { id: "q1", text: "Is the sender / caller verified through an official source?", safeIfYes: true },
  { id: "q2", text: "Are they asking you to share an OTP, PIN, or CVV?", safeIfYes: false },
  { id: "q3", text: "Are they creating urgency or fear (account block, arrest, prize expiry)?", safeIfYes: false },
  { id: "q4", text: "Are they asking you to pay money, deposit a fee, or scan a QR to 'receive'?", safeIfYes: false },
  { id: "q5", text: "Did they ask you to install AnyDesk, TeamViewer or any remote-access app?", safeIfYes: false },
  { id: "q6", text: "Is the link/website using a known, official domain (no bit.ly, tinyurl, or lookalikes)?", safeIfYes: true },
  { id: "q7", text: "Did you initiate this contact yourself?", safeIfYes: true },
];

function Verifier() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const score = useMemo(() => {
    let s = 0;
    QUESTIONS.forEach((q) => {
      const a = answers[q.id];
      if (a === undefined) return;
      if (q.safeIfYes) { if (!a) s += 2; }
      else { if (a) s += 2; }
    });
    return s;
  }, [answers]);

  const answered = Object.keys(answers).length;
  const verdict = answered === 0 ? null : score >= 6 ? "Dangerous" : score >= 2 ? "Suspicious" : "Safe";
  const verdictMeta: Record<string, any> = {
    Safe: { color: "oklch(0.68 0.18 150)", icon: ShieldCheck, msg: "Indicators look clean. Stay vigilant — scams evolve." },
    Suspicious: { color: "oklch(0.8 0.16 80)", icon: ShieldAlert, msg: "Several warning signs. Pause, verify through a separate channel." },
    Dangerous: { color: "oklch(0.62 0.24 25)", icon: ShieldAlert, msg: "Strong scam indicators. Do not engage. Report on 1930." },
  };

  return (
    <section id="verify" className="py-20 lg:py-28 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Verification Center"
          title="Run a 30-second safety check"
          subtitle="Answer a few quick questions to get a personalized risk verdict for any interaction."
        />
        <div className="mt-12 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass rounded-2xl p-5 sm:p-7 space-y-3">
            {QUESTIONS.map((q, i) => (
              <div key={q.id} className="rounded-xl p-4 bg-background/40 border border-border/60 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs text-primary/70 mt-0.5">0{i + 1}</span>
                  <p className="text-sm leading-relaxed">{q.text}</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button onClick={() => setAnswers({ ...answers, [q.id]: true })}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium border transition ${answers[q.id] === true ? "bg-primary text-primary-foreground border-primary" : "border-border bg-white/5 hover:bg-white/10"}`}>
                    Yes
                  </button>
                  <button onClick={() => setAnswers({ ...answers, [q.id]: false })}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium border transition ${answers[q.id] === false ? "bg-foreground text-background border-foreground" : "border-border bg-white/5 hover:bg-white/10"}`}>
                    No
                  </button>
                </div>
              </div>
            ))}
            {answered > 0 && (
              <Button variant="ghost" onClick={() => setAnswers({})} className="text-xs text-muted-foreground">Reset checklist</Button>
            )}
          </div>

          <div className="glass rounded-2xl p-7 flex flex-col">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-mono">Live Verdict</div>
            {verdict ? (
              <div className="mt-4 flex-1 flex flex-col">
                <div className="flex items-center gap-3">
                  {(() => { const I = verdictMeta[verdict].icon; return <I className="w-10 h-10" style={{ color: verdictMeta[verdict].color }} />; })()}
                  <div className="font-display text-3xl font-bold" style={{ color: verdictMeta[verdict].color }}>{verdict}</div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{verdictMeta[verdict].msg}</p>
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5"><span>Risk score</span><span>{score} / 14</span></div>
                  <div className="h-2 rounded-full bg-background/60 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${(score / 14) * 100}%`, background: verdictMeta[verdict].color }} />
                  </div>
                </div>
                <div className="mt-auto pt-6 text-xs text-muted-foreground">
                  Answered {answered} of {QUESTIONS.length} questions
                </div>
              </div>
            ) : (
              <div className="mt-6 flex-1 flex items-center justify-center text-center text-sm text-muted-foreground">
                Start answering the checklist to see your risk verdict here.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TIPS ---------------- */
function Tips() {
  return (
    <section id="tips" className="py-20 lg:py-28 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Cyber Safety Tips" title="10 habits that keep you safe"
          subtitle="Simple, practical rules. Share them with family — especially elders." />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {tipsData.map((t, i) => {
            const Icon = iconMap[t.icon] || ShieldCheck;
            return (
              <div key={t.title} className="glass rounded-2xl p-5 group hover:border-primary/40 transition"
                style={{ animationDelay: `${i * 50}ms` }}>
                <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-base">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ARTICLES ---------------- */
function Articles() {
  const [active, setActive] = useState<typeof articlesData[number] | null>(null);
  return (
    <section id="articles" className="py-20 lg:py-28 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Prevention Articles" title="Learn how scams really work"
          subtitle="Deeper guides written for Indian users — phishing, digital arrest, UPI fraud and more." />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articlesData.map((a) => (
            <article key={a.id} className="glass rounded-2xl p-6 flex flex-col group cursor-pointer hover:border-primary/40 transition"
              onClick={() => setActive(a)}>
              <Badge variant="outline" className="self-start border-primary/30 text-primary bg-primary/10">{a.category}</Badge>
              <h3 className="mt-4 font-display text-xl font-bold leading-snug">{a.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{a.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <span>{a.readTime}</span>
                <span className="flex items-center gap-1 text-primary group-hover:gap-2 transition-all">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-2xl bg-card border-border max-h-[85vh] overflow-y-auto">
          {active && (
            <>
              <DialogHeader>
                <Badge variant="outline" className="self-start border-primary/30 text-primary bg-primary/10 mb-2">{active.category}</Badge>
                <DialogTitle className="font-display text-2xl">{active.title}</DialogTitle>
                <DialogDescription className="text-xs">{active.readTime}</DialogDescription>
              </DialogHeader>
              <div className="mt-4 text-sm leading-relaxed text-foreground/90 whitespace-pre-line">{active.content}</div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ---------------- COMMUNITY REPORTS ---------------- */
type Report = { id: string; type: string; description: string; suspect: string; ts: number };

function CommunityReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [type, setType] = useState("Job Scam");
  const [description, setDescription] = useState("");
  const [suspect, setSuspect] = useState("");

  useEffect(() => {
    setReports(JSON.parse(localStorage.getItem("scamshield_reports") || "[]"));
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !suspect.trim()) { toast.error("Please fill description and number/link"); return; }
    const r: Report = { id: crypto.randomUUID(), type, description: description.trim(), suspect: suspect.trim(), ts: Date.now() };
    const next = [r, ...reports].slice(0, 50);
    setReports(next);
    localStorage.setItem("scamshield_reports", JSON.stringify(next));
    setDescription(""); setSuspect("");
    toast.success("Report submitted — thank you for helping the community");
  };

  return (
    <section id="report" className="py-20 lg:py-28 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Community Reports" title="Warn the next victim"
          subtitle="Share scams you've encountered. Reports are stored locally in your browser to keep things private." />
        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          <form onSubmit={submit} className="glass rounded-2xl p-5 sm:p-7 space-y-4">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground font-mono">Scam type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="mt-2 bg-background/40 border-border"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Array.from(new Set(scamsData.map((s) => s.category))).map((c) =>
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground font-mono">Description</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="What happened? Include the message wording and any context."
                className="mt-2 min-h-32 bg-background/40 border-border resize-none" />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground font-mono">Suspicious number / link</Label>
              <Input value={suspect} onChange={(e) => setSuspect(e.target.value)}
                placeholder="+91 98XXXXXXXX or bit.ly/xyz"
                className="mt-2 bg-background/40 border-border" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 shadow-[var(--shadow-glow)]">
              <Send className="w-4 h-4 mr-2" /> Submit Report
            </Button>
          </form>

          <div className="glass rounded-2xl p-5 sm:p-7">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg">Recent Reports</h3>
              <Badge variant="outline" className="border-border bg-white/5 text-xs">{reports.length} total</Badge>
            </div>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {reports.length === 0 && (
                <div className="text-center py-12 text-sm text-muted-foreground">
                  No reports yet. Be the first to warn others.
                </div>
              )}
              {reports.map((r) => (
                <div key={r.id} className="rounded-xl p-4 bg-background/40 border border-border/60">
                  <div className="flex items-start justify-between gap-3">
                    <Badge className="bg-primary/10 text-primary border-primary/30 text-xs">{r.type}</Badge>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {new Date(r.ts).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed">{r.description}</p>
                  <div className="mt-2 text-xs font-mono text-muted-foreground break-all">↳ {r.suspect}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- OFFICIAL HELP ---------------- */
function OfficialHelp() {
  return (
    <section id="help" className="py-20 lg:py-28 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden glass rounded-3xl p-8 sm:p-12">
          <div className="absolute inset-0 bg-[var(--gradient-danger)] opacity-15 pointer-events-none" />
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="relative grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <Badge className="bg-primary/15 text-primary border-primary/30">Emergency</Badge>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold">Already targeted? Act in the first hour.</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
                The first 60 minutes after a fraud are critical. Indian banks can sometimes reverse a transaction
                if reported immediately. Call the National Cyber Helpline, then file an online report.
              </p>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                <a href="tel:1930" className="rounded-xl p-5 bg-background/40 border border-border hover:border-primary/40 transition group">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-mono">Helpline</div>
                  <div className="mt-1 font-display text-3xl font-bold text-primary">1930</div>
                  <div className="mt-1 text-sm text-muted-foreground">National Cyber Crime Helpline — 24×7</div>
                </a>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer"
                  className="rounded-xl p-5 bg-background/40 border border-border hover:border-primary/40 transition group">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-mono">Portal</div>
                  <div className="mt-1 font-display text-xl font-bold flex items-center gap-2">
                    cybercrime.gov.in <ExternalLink className="w-4 h-4 text-primary" />
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">File a written complaint with evidence</div>
                </a>
              </div>
            </div>
            <div className="rounded-2xl p-6 bg-background/60 border border-border">
              <h3 className="font-display font-bold flex items-center gap-2"><ListChecks className="w-4 h-4 text-primary" /> If money is lost</h3>
              <ol className="mt-4 space-y-3 text-sm">
                {["Call 1930 immediately — within the first hour.",
                  "Freeze the affected card via your bank app.",
                  "Take screenshots of every message, call log and transaction.",
                  "File an FIR at cybercrime.gov.in.",
                  "Inform family — scammers often re-target the same household."].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-mono text-primary text-xs mt-0.5">0{i + 1}</span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="border-t border-border mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" strokeWidth={2.5} />
            <span className="font-display font-bold text-lg">Scam<span className="text-primary">Shield</span>.in</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
            A free educational platform helping Indians recognize and avoid online fraud. Built for students,
            job seekers, families and senior citizens.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[["#analyzer", "Analyzer"], ["#database", "Database"], ["#verify", "Verify"], ["#tips", "Tips"], ["#articles", "Articles"], ["#report", "Report"]].map(([h, l]) => (
              <li key={h}><a href={h} className="text-muted-foreground hover:text-primary transition">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-primary" /> Helpline: 1930</li>
            <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-primary" /> hello@scamshield.in</li>
            <li className="flex items-center gap-2"><ExternalLink className="w-3.5 h-3.5 text-primary" /> cybercrime.gov.in</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ScamShield.in — All rights reserved.</p>
          <p className="text-center sm:text-right max-w-xl">
            Disclaimer: ScamShield.in is an educational platform. We are not a government agency.
            For official complaints, always use cybercrime.gov.in or call 1930.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- SHARED ---------------- */
function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="max-w-3xl">
      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-mono">
        <span className="w-8 h-px bg-primary" /> {eyebrow}
      </div>
      <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">{title}</h2>
      <p className="mt-4 text-base text-muted-foreground leading-relaxed">{subtitle}</p>
    </div>
  );
}
