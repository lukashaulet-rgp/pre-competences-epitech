import { useState } from "react";
import { X } from "lucide-react";
import { LEVELS, preLevel, readinessColor } from "./data";
import { Badge } from "./ui";

// Dimensions du graphe (en pixels)
const W = 1180;
const UNIT = 34; // hauteur d'un lien projet → compétence
const GAP = 32; // espace entre deux blocs
const BAR = 14; // largeur des barres
const PAD = 24;
const MID_X = 520;
const RIGHT_X = W - BAR;
const MODULE = { name: "Fondamentaux du développement web", credits: 7 };

const READINESS_LEGEND = [
  { label: "100%", pct: 100 },
  { label: "≥75%", pct: 75 },
  { label: "≥50%", pct: 50 },
  { label: "≥25%", pct: 25 },
  { label: "<25%", pct: 0 },
];

// Ruban courbe entre deux barres (comme le graphe de l'intra)
function ribbon(x0, y0, x1, y1, h) {
  const xm = (x0 + x1) / 2;
  return `M${x0},${y0} C${xm},${y0} ${xm},${y1} ${x1},${y1} L${x1},${y1 + h} C${xm},${y1 + h} ${xm},${y0 + h} ${x0},${y0 + h} Z`;
}

function buildGraph(projects, mode) {
  const levelOf = (s) => (mode === "pre" ? preLevel(s) : s.official);

  // Compétences uniques : une même compétence peut servir à plusieurs projets
  const skills = new Map();
  const links = [];
  projects.forEach((p) =>
    p.skills.forEach((s) => {
      const node = skills.get(s.name) ?? { name: s.name, level: 0, required: 0, links: [] };
      node.level = Math.max(node.level, levelOf(s));
      node.required = Math.max(node.required, s.required);
      const link = { projectId: p.id, skill: s.name };
      node.links.push(link);
      skills.set(s.name, node);
      links.push(link);
    })
  );

  // Colonne gauche : projets
  const leftH = links.length * UNIT + (projects.length - 1) * GAP;
  const midNodes = [...skills.values()];
  const midH = links.length * UNIT + (midNodes.length - 1) * GAP;
  const height = Math.max(leftH, midH) + PAD * 2;

  let y = (height - leftH) / 2;
  const left = projects.map((p) => {
    const ok = p.skills.filter((s) => levelOf(s) >= s.required).length;
    const node = { id: p.id, name: p.name, y, h: p.skills.length * UNIT, color: readinessColor(Math.round((ok / p.skills.length) * 100)) };
    p.skills.forEach((s, i) => {
      links.find((l) => l.projectId === p.id && l.skill === s.name && l.y0 === undefined).y0 = y + i * UNIT;
    });
    y += node.h + GAP;
    return node;
  });

  // Colonne du milieu : compétences
  y = (height - midH) / 2;
  const mid = midNodes.map((n) => {
    n.y = y;
    n.h = n.links.length * UNIT;
    n.color = LEVELS[n.level].color;
    n.links.forEach((l, i) => (l.y1 = y + i * UNIT));
    y += n.h + GAP;
    return n;
  });

  // Colonne de droite : le module
  const rightH = links.length * UNIT;
  const right = { y: (height - rightH) / 2, h: rightH };
  let ry = right.y;
  mid.forEach((n) => {
    n.yRight = ry;
    ry += n.h;
  });

  return { height, left, mid, right, links };
}

function Legend({ title, items }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-32 text-sm font-semibold text-ep-muted">{title}</span>
      {items}
    </div>
  );
}

export default function ValidationGraph({ projects, focusId, onClose }) {
  const [mode, setMode] = useState("pre");
  const [hover, setHover] = useState(null); // { projectId } ou { skill }
  const g = buildGraph(projects, mode);
  const focus = hover ?? { projectId: focusId };

  const linkActive = (l) => l.projectId === focus.projectId || l.skill === focus.skill;
  const skillActive = (n) => n.links.some(linkActive);

  const total = g.mid.length;
  const officialOk = buildGraph(projects, "official").mid.filter((n) => n.level >= n.required).length;
  const preMissing = buildGraph(projects, "pre").mid.filter((n) => n.level < n.required);
  const preOk = total - preMissing.length;
  // La compétence avec le plus gros écart, même quand on regarde les niveaux actuels
  const priority = preMissing.sort((a, b) => (a.level - a.required) - (b.level - b.required))[0];

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-y-auto py-10">
      <div className="fixed inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-[1260px] max-w-[95vw] bg-[#2b2b2b] border border-ep-line">
        <div className="flex items-start justify-between gap-6 px-7 py-6 border-b border-ep-line">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-ep-muted">{MODULE.name.toUpperCase()} • {MODULE.credits} CRÉDITS_</p>
            <h3 className="font-semibold text-2xl text-white mt-1">Graphe de validation</h3>
          </div>
          <div className="flex items-center gap-4">
            {/* Bascule : niveau officiel actuel ou niveau avec les pré-compétences */}
            <div className="flex border border-ep-line">
              {[
                ["official", "ACTUELLES"],
                ["pre", "AVEC PRÉ-COMPÉTENCES"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setMode(key)}
                  className={`px-4 py-2 font-mono text-xs font-semibold ${mode === key ? "bg-ep-blue text-white" : "text-ep-muted hover:text-white"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <button onClick={onClose} className="text-ep-muted hover:text-white p-1" aria-label="Fermer">
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="px-7 py-6 space-y-3 border-b border-ep-line">
          <Legend title="Projets" items={READINESS_LEGEND.map((r) => <Badge key={r.label} color={readinessColor(r.pct)}>{r.label}</Badge>)} />
          <Legend title="Compétences" items={LEVELS.map((l) => <Badge key={l.label} color={l.color}>{l.label}</Badge>)} />
          <Legend
            title="Module"
            items={officialOk === total ? <Badge color="#5fcf91">SANS ALERTE</Badge> : preOk === total ? <Badge color="#e6b93d">À SURVEILLER</Badge> : <Badge color="#e5595b">CRITIQUE</Badge>}
          />
        </div>

        <div className="overflow-x-auto px-7 py-4">
          <div className="relative" style={{ width: W, height: g.height }} onMouseLeave={() => setHover(null)}>
            <svg width={W} height={g.height} className="absolute inset-0">
              {/* Rubans projet → compétence */}
              {g.links.map((l) => {
                const skill = g.mid.find((n) => n.name === l.skill);
                return (
                  <path
                    key={`${l.projectId}-${l.skill}`}
                    d={ribbon(BAR, l.y0, MID_X, l.y1, UNIT)}
                    fill={linkActive(l) ? skill.color : "#6b6e73"}
                    opacity={linkActive(l) ? 0.55 : 0.3}
                    className="transition-all duration-200"
                  />
                );
              })}
              {/* Rubans compétence → module */}
              {g.mid.map((n) => (
                <path
                  key={n.name}
                  d={ribbon(MID_X + BAR, n.y, RIGHT_X, n.yRight, n.h)}
                  fill={skillActive(n) ? n.color : "#6b6e73"}
                  opacity={skillActive(n) ? 0.4 : 0.25}
                  className="transition-all duration-200"
                />
              ))}
              {/* Barres */}
              {g.left.map((n) => (
                <rect key={n.id} x={0} y={n.y} width={BAR} height={n.h} fill={n.color} rx={2}
                  onMouseEnter={() => setHover({ projectId: n.id })} className="cursor-pointer" />
              ))}
              {g.mid.map((n) => (
                <rect key={n.name} x={MID_X} y={n.y} width={BAR} height={n.h} fill={n.color} rx={2}
                  onMouseEnter={() => setHover({ skill: n.name })} className="cursor-pointer" />
              ))}
              <rect x={RIGHT_X} y={g.right.y} width={BAR} height={g.right.h} fill="#8a8d92" rx={2} />
            </svg>

            {/* Textes en HTML pour qu'ils passent à la ligne */}
            {g.left.map((n) => (
              <button
                key={n.id}
                onMouseEnter={() => setHover({ projectId: n.id })}
                className={`absolute -translate-y-1/2 text-left ${focus.projectId === n.id ? "text-white font-semibold" : "text-gray-300"}`}
                style={{ left: BAR + 12, top: n.y + n.h / 2 }}
              >
                {n.name}
              </button>
            ))}
            {g.mid.map((n) => (
              <button
                key={n.name}
                onMouseEnter={() => setHover({ skill: n.name })}
                className={`absolute -translate-y-1/2 text-left text-sm leading-snug w-[250px] ${skillActive(n) ? "text-white font-semibold" : "text-gray-400"}`}
                style={{ left: MID_X + BAR + 12, top: n.y + n.h / 2 }}
              >
                {n.name}
                <span className="block font-mono text-[10px] font-normal mt-0.5" style={{ color: n.color }}>
                  {LEVELS[n.level].label} / REQUIS {LEVELS[n.required].short}
                </span>
              </button>
            ))}
            <div className="absolute -translate-y-1/2 text-right text-gray-200 w-[220px]" style={{ right: BAR + 12, top: g.right.y + g.right.h / 2 }}>
              {MODULE.name}
              <span className="block text-sm text-ep-muted">{MODULE.credits} cr.</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 border-t border-ep-line">
          <div className="px-7 py-5 border-r border-ep-line">
            <p className="font-mono text-xs tracking-widest text-ep-muted">VALIDÉES AUJOURD'HUI_</p>
            <p className="font-title text-3xl text-ep-blue mt-1">{officialOk} / {total}</p>
            <p className="font-mono text-xs text-ep-muted mt-1">Défense et moulinette</p>
          </div>
          <div className="px-7 py-5 border-r border-ep-line">
            <p className="font-mono text-xs tracking-widest text-ep-muted">AVEC TES PRÉ-COMPÉTENCES_</p>
            <p className="font-title text-3xl text-ep-green mt-1">{preOk} / {total}</p>
            <p className="font-mono text-xs text-ep-muted mt-1">Si tu passes la défense maintenant</p>
          </div>
          <div className="px-7 py-5">
            <p className="font-mono text-xs tracking-widest text-ep-muted">À TRAVAILLER EN PRIORITÉ_</p>
            <p className="font-semibold text-white mt-2 leading-snug">
              {priority?.name ?? "Rien, tout est prêt ✓"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
