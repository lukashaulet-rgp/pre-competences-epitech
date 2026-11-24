import {
  Bell, Search, ChevronDown, LayoutGrid, Gauge, FileText, Target, Trophy,
  CalendarDays, BookOpen, Puzzle, Library, X,
} from "lucide-react";
import { LEVELS } from "./data";

export function Header() {
  return (
    <header className="h-[72px] flex items-center gap-8 justify-between px-6 border-b border-ep-line bg-ep-side sticky top-0 z-20">
      <span className="font-title text-[34px] tracking-wide text-white shrink-0">{"{EPITECH}"}</span>
      <div className="flex-1 max-w-[690px] flex items-center gap-3 h-11 px-4 border border-ep-line bg-ep-panel text-ep-muted">
        <Search size={18} /> <span className="truncate">Rechercher... (CTRL + K)</span>
      </div>
      <div className="flex items-center gap-6 text-white shrink-0">
        <Bell size={20} />
        <div className="flex items-center gap-3 font-semibold">
          <div className="w-11 h-11 rounded bg-ep-line" />
          LUKAS HAULET <ChevronDown size={16} />
        </div>
        <LayoutGrid size={22} />
      </div>
    </header>
  );
}

function NavItem({ icon: Icon, label, active, isNew, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded font-medium text-left transition ${
        active ? "bg-ep-blue text-white" : "text-gray-200 hover:bg-ep-panel"
      }`}
    >
      <Icon size={18} className={`shrink-0 ${active ? "text-white" : "text-ep-green"}`} />
      <span className="truncate">{label}</span>
      {isNew && (
        <span className={`ml-auto font-mono text-[10px] px-1.5 border ${active ? "border-white text-white" : "border-ep-pink text-ep-pink"}`}>
          NEW
        </span>
      )}
    </button>
  );
}

function NavGroup({ children }) {
  return <p className="font-mono text-sm tracking-[0.2em] text-ep-muted px-3 pt-6 pb-2 first:pt-4">{children}</p>;
}

export function Sidebar({ page, setPage }) {
  return (
    <aside className="w-[290px] shrink-0 min-h-[calc(100vh-72px)] border-r border-ep-line bg-ep-side p-3.5 space-y-1">
      <NavGroup>{"< VUE D'ENSEMBLE />"}</NavGroup>
      <NavItem icon={Gauge} label="Tableau de bord" />
      <NavItem icon={FileText} label="Détails académiques" />
      <NavItem icon={Target} label="Pré-compétences" isNew active={page === "skills"} onClick={() => setPage("skills")} />
      <NavItem icon={CalendarDays} label="Planning" />
      <NavGroup>{"< PÉDAGOGIE />"}</NavGroup>
      <NavItem icon={BookOpen} label="Modules" />
      <NavItem icon={Puzzle} label="Projets" />
      <NavItem icon={Library} label="E-learning" />
      <NavItem icon={Trophy} label="Tournois" isNew active={page === "tournaments"} onClick={() => setPage("tournaments")} />
    </aside>
  );
}

export function Stat({ label, value, hint }) {
  return (
    <div className="px-6 py-5 border-r border-white/15 last:border-r-0 min-w-0">
      <p className="font-mono text-xs tracking-widest text-white/80 truncate">{label}_</p>
      <p className="font-title text-4xl text-white mt-2">{value}</p>
      <p className="font-mono text-xs text-white/80 mt-1 truncate">{hint}</p>
    </div>
  );
}

// Bandeau bleu quadrillé, comme "SALUT, LUKAS" sur le tableau de bord
export function Hero({ title, text, children }) {
  return (
    <section
      className="relative bg-ep-blue px-10 pt-9 pb-9 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
      }}
    >
      <div className="absolute top-0 right-0 w-[100px] h-[50px] bg-white/20" />
      <div className="absolute top-0 right-[150px] w-[50px] h-[50px] bg-white/20" />
      <div className="absolute top-[50px] right-[100px] w-[50px] h-[50px] bg-ep-green/70" />

      <p className="font-mono text-sm tracking-widest text-white/85">{"< Marseille • Bachelor • Promotion 2029 />"}</p>
      <h1 className="font-title text-6xl leading-tight text-white mt-4">{title}</h1>
      <p className="text-xl leading-relaxed text-white/95 max-w-[720px] mt-3">{text}</p>
      <div className="grid grid-cols-3 bg-black/10 mt-8">{children}</div>
    </section>
  );
}

export function SectionTitle({ color, children, right }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="w-1.5 h-8 shrink-0" style={{ background: color }} />
      <h2 className="font-title text-3xl text-white truncate">{children}</h2>
      <span className="flex-1 h-px bg-ep-line min-w-6" />
      {right && <span className="font-mono text-sm tracking-[0.2em] text-ep-muted whitespace-nowrap">{right}</span>}
    </div>
  );
}

export function Badge({ color, children, filled }) {
  return (
    <span
      className="font-mono text-xs font-semibold px-2 py-1 border whitespace-nowrap"
      style={filled ? { background: color, borderColor: color, color: "#1f1f1f" } : { color, borderColor: color }}
    >
      {children}
    </span>
  );
}

// Bouton teinté comme "VOIR" dans les notifications
export function TintButton({ color, icon: Icon, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2.5 font-mono text-xs font-semibold whitespace-nowrap transition hover:brightness-125"
      style={{ background: `${color}26`, color }}
    >
      {Icon && <Icon size={15} />} {children}
    </button>
  );
}

// Barre de niveau 1 → 5 ; la case "requis" a un contour blanc
export function LevelBar({ level, required }) {
  const color = LEVELS[level].color;
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`h-3 flex-1 ${i === required ? "outline outline-1 outline-white/70 outline-offset-1" : ""}`}
          style={{ background: i <= level ? color : "#3a3a3a" }}
        />
      ))}
    </div>
  );
}

// Panneau qui s'ouvre sur la droite (cours, exercices)
export function Drawer({ open, onClose, kicker, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-30 flex justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <aside className="relative w-[600px] max-w-full h-full overflow-y-auto bg-ep-bg border-l border-ep-line">
        <div className="sticky top-0 bg-ep-bg border-b border-ep-line px-8 py-6 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="font-mono text-xs tracking-[0.2em] text-ep-muted">{kicker}_</p>
            <h3 className="font-semibold text-2xl leading-snug text-white mt-2">{title}</h3>
          </div>
          <button onClick={onClose} className="text-ep-muted hover:text-white p-1" aria-label="Fermer">
            <X size={22} />
          </button>
        </div>
        <div className="px-8 py-6 space-y-3">{children}</div>
      </aside>
    </div>
  );
}
