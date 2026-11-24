import { useState } from "react";
import { ArrowRight, CirclePlay, Dumbbell, FileText, FlaskConical, Clock, CircleCheck, CircleX, CalendarCheck, Repeat, Percent } from "lucide-react";
import ValidationGraph from "./ValidationGraph";
import { LEVELS, PROJECTS, preLevel, skillStats, formatTime, readiness, readinessColor } from "./data";
import { Hero, Stat, SectionTitle, Badge, TintButton, LevelBar, Drawer } from "./ui";

const COURSE_TYPE = {
  "VIDÉO": { icon: CirclePlay, color: "#8d9df6" },
  "ARTICLE": { icon: FileText, color: "#e6b93d" },
  "TP": { icon: FlaskConical, color: "#5fcf91" },
};

function ProjectCard({ project, active, onClick }) {
  const pct = readiness(project);
  const color = readinessColor(pct);
  return (
    <button
      onClick={onClick}
      className={`text-left p-5 border border-l-4 transition ${
        active ? "bg-[#333] border-ep-blue" : "bg-ep-panel border-ep-line hover:bg-[#303030]"
      }`}
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-widest text-ep-blue">{project.deadline}_</p>
          <p className="font-semibold text-white text-lg leading-snug mt-0.5">{project.name}</p>
        </div>
        <Badge color={color}>{pct}%</Badge>
      </div>
      <div className="h-1 bg-ep-line mt-4">
        <div className="h-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <p className="font-mono text-[11px] text-ep-muted mt-2">{project.skills.length} compétences</p>
    </button>
  );
}

function SummaryBox({ label, value, hint, color }) {
  return (
    <div className="bg-ep-panel border border-ep-line border-l-4 px-6 py-5" style={{ borderLeftColor: color }}>
      <p className="font-mono text-xs tracking-widest text-ep-muted">{label}_</p>
      <p className="font-title text-4xl mt-2" style={{ color }}>{value}</p>
      <p className="font-mono text-xs text-ep-muted mt-1">{hint}</p>
    </div>
  );
}

function LevelRow({ label, level, required }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-2">
        <p className="font-mono text-[11px] tracking-widest text-ep-muted">{label}</p>
        <Badge color={LEVELS[level].color}>{LEVELS[level].label}</Badge>
      </div>
      <LevelBar level={level} required={required} />
    </div>
  );
}

function MiniStat({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-ep-bg border border-ep-line px-4 py-3">
      <p className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-ep-muted">
        <Icon size={13} style={{ color }} /> {label}
      </p>
      <p className="font-title text-2xl text-white mt-1">{value}</p>
    </div>
  );
}

function SkillCard({ index, skill, onOpen }) {
  const pre = preLevel(skill);
  const stats = skillStats(skill);
  const ready = pre >= skill.required;
  const seen = skill.courses.filter((c) => c.done).length;

  return (
    <article className="bg-ep-panel border border-ep-line border-l-4 p-7" style={{ borderLeftColor: LEVELS[pre].color }}>
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-widest text-ep-muted">COMPÉTENCE {String(index + 1).padStart(2, "0")}_</p>
          <h3 className="font-semibold text-white text-xl mt-1">{skill.name}</h3>
        </div>
        {ready ? <Badge color="#5fcf91" filled>PRÊTE ✓</Badge> : <Badge color="#ef6b3f">EN COURS</Badge>}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_420px] gap-10 mt-6">
        <div className="space-y-5">
          <LevelRow label="ACTUELLE — DÉFENSE / MOULINETTE" level={skill.official} required={skill.required} />
          <LevelRow label="PRÉ-COMPÉTENCE — EXERCICES" level={pre} required={skill.required} />
          <p className="font-mono text-xs text-ep-muted">
            Requis pour valider : <span className="text-white">{LEVELS[skill.required].label}</span>
            {!ready && <span className="text-ep-orange"> • encore {skill.required - pre} niveau{skill.required - pre > 1 ? "x" : ""}</span>}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <MiniStat icon={Clock} label="TEMPS" value={formatTime(stats.minutes)} color="#8d9df6" />
          <MiniStat icon={Repeat} label="ESSAIS" value={stats.attempts} color="#e6b93d" />
          <MiniStat icon={CalendarCheck} label="RÉUSSIE LE" value={stats.last} color="#c565e6" />
          <MiniStat icon={CircleCheck} label="RÉUSSITES" value={stats.successes} color="#5fcf91" />
          <MiniStat icon={CircleX} label="ÉCHECS" value={stats.fails} color="#e5595b" />
          <MiniStat
            icon={Percent}
            label="TAUX"
            value={stats.attempts ? `${Math.round((stats.successes / stats.attempts) * 100)}%` : "—"}
            color="#ef6b3f"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-7 pt-6 border-t border-ep-line">
        <TintButton color="#8d9df6" icon={CirclePlay} onClick={() => onOpen("courses")}>
          COURS ({skill.courses.length})
        </TintButton>
        <TintButton color="#5fcf91" icon={Dumbbell} onClick={() => onOpen("exercises")}>
          EXERCICES ({skill.exercises.length})
        </TintButton>
        <span className="ml-auto font-mono text-xs text-ep-muted">{seen} / {skill.courses.length} cours vus</span>
      </div>
    </article>
  );
}

function CourseRow({ c }) {
  const { icon: Icon, color } = COURSE_TYPE[c.type];
  return (
    <div className="flex items-center gap-5 bg-ep-panel border border-ep-line p-5">
      <div className="w-12 h-12 shrink-0 flex items-center justify-center border" style={{ borderColor: color, color }}>
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[11px] tracking-widest" style={{ color }}>{c.type} • {c.duration}_</p>
        <p className="font-semibold text-white mt-0.5">{c.title}</p>
      </div>
      {c.done ? (
        <span className="font-mono text-xs text-ep-green whitespace-nowrap">VU ✓</span>
      ) : (
        <TintButton color="#8d9df6">OUVRIR</TintButton>
      )}
    </div>
  );
}

// Une case par essai : rouge = échec, vert = réussite
// shortcut: on suppose les échecs avant les réussites ; à remplacer par le vrai historique des essais
function AttemptTimeline({ fails, successes }) {
  const attempts = [...Array(fails).fill(false), ...Array(successes).fill(true)];
  if (attempts.length === 0) return <span className="font-mono text-xs text-ep-muted">Aucun essai</span>;
  return (
    <div className="flex items-center gap-1">
      {attempts.map((ok, i) => (
        <span
          key={i}
          title={`Essai ${i + 1} : ${ok ? "réussi" : "échoué"}`}
          className="w-6 h-6 flex items-center justify-center font-mono text-[10px] text-ep-bg"
          style={{ background: ok ? "#5fcf91" : "#e5595b" }}
        >
          {i + 1}
        </span>
      ))}
    </div>
  );
}

function ExerciseRow({ e }) {
  const color = LEVELS[e.level].color;
  const attempts = e.fails + e.successes;
  let status = <span className="text-ep-muted">À faire</span>;
  if (e.successDate) status = <span className="text-ep-green">Réussi le {e.successDate}</span>;
  else if (e.fails > 0) status = <span className="text-ep-orange">Pas encore réussi</span>;

  return (
    <div className="bg-ep-panel border border-ep-line border-l-4 p-5" style={{ borderLeftColor: color }}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-widest" style={{ color }}>VALIDE LE {LEVELS[e.level].label}_</p>
          <p className="font-semibold text-white mt-0.5">{e.title}</p>
          <p className="font-mono text-xs mt-1">{status}</p>
        </div>
        <TintButton color={e.successDate ? "#9a9a9a" : "#5fcf91"}>
          {e.successDate ? "REFAIRE" : e.fails > 0 ? "RÉESSAYER" : "LANCER"}
        </TintButton>
      </div>
      <div className="mt-4">
        <p className="font-mono text-[10px] tracking-widest text-ep-muted mb-2">
          {attempts} ESSAI{attempts > 1 ? "S" : ""}_
        </p>
        <AttemptTimeline fails={e.fails} successes={e.successes} />
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-1 mt-4 font-mono text-xs text-ep-muted">
        <span className="flex items-center gap-1.5"><Clock size={13} /> {formatTime(e.minutes)}</span>
        {attempts > 0 && <span>≈ {Math.round(e.minutes / attempts)} min / essai</span>}
        <span className="flex items-center gap-1.5 text-ep-green"><CircleCheck size={13} /> {e.successes} réussite{e.successes > 1 ? "s" : ""}</span>
        <span className="flex items-center gap-1.5 text-[#e5595b]"><CircleX size={13} /> {e.fails} échec{e.fails > 1 ? "s" : ""}</span>
      </div>
    </div>
  );
}

function ExerciseSummary({ skill }) {
  const s = skillStats(skill);
  return (
    <div className="grid grid-cols-4 gap-2 mb-4">
      <MiniStat icon={Repeat} label="ESSAIS" value={s.attempts} color="#e6b93d" />
      <MiniStat icon={CircleCheck} label="RÉUSSITES" value={s.successes} color="#5fcf91" />
      <MiniStat icon={CircleX} label="ÉCHECS" value={s.fails} color="#e5595b" />
      <MiniStat icon={Clock} label="TEMPS" value={formatTime(s.minutes)} color="#8d9df6" />
    </div>
  );
}

export default function SkillsPage() {
  const [projectId, setProjectId] = useState(PROJECTS[0].id);
  const [drawer, setDrawer] = useState(null); // { kind: "courses" | "exercises", skill }
  const [graphOpen, setGraphOpen] = useState(false);
  const project = PROJECTS.find((p) => p.id === projectId);

  const allSkills = PROJECTS.flatMap((p) => p.skills);
  const validated = allSkills.filter((s) => preLevel(s) >= s.required).length;
  const totals = allSkills.map(skillStats);
  const minutes = totals.reduce((sum, t) => sum + t.minutes, 0);
  const successes = totals.reduce((sum, t) => sum + t.successes, 0);
  const fails = totals.reduce((sum, t) => sum + t.fails, 0);

  const projectStats = project.skills.map(skillStats);
  const officialOk = project.skills.filter((s) => s.official >= s.required).length;
  const preOk = project.skills.filter((s) => preLevel(s) >= s.required).length;

  return (
    <>
      <Hero
        title="PRÉ-COMPÉTENCES"
        text="Entraîne-toi sur chaque compétence d'un projet avant la défense ou la moulinette IA. Chaque exercice réussi valide un niveau, de 0 à 5."
      >
        <Stat label="PRÉ-COMPÉTENCES VALIDÉES" value={`${validated} / ${allSkills.length}`} hint="Niveau requis atteint" />
        <Stat label="TEMPS D'ENTRAÎNEMENT" value={formatTime(minutes)} hint="Sur tous les exercices" />
        <Stat label="TAUX DE RÉUSSITE" value={`${Math.round((successes / (successes + fails)) * 100)}%`} hint={`${successes} réussites • ${fails} échecs`} />
      </Hero>

      <section>
        <SectionTitle color="#ef6b3f" right={`${PROJECTS.length} PROJETS`}>MES PROJETS</SectionTitle>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} active={p.id === projectId} onClick={() => setProjectId(p.id)} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle color="#d14fd8" right={`${project.credits} CRÉDITS • ${project.deadline}`}>
          {project.name.toUpperCase()}
        </SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <SummaryBox label="COMPÉTENCES ACTUELLES" value={`${officialOk} / ${project.skills.length}`} hint="Validées en défense ou moulinette" color="#8d9df6" />
          <SummaryBox label="PRÉ-COMPÉTENCES VALIDÉES" value={`${preOk} / ${project.skills.length}`} hint="Validées par les exercices" color="#5fcf91" />
          <SummaryBox label="TEMPS SUR CE PROJET" value={formatTime(projectStats.reduce((s, t) => s + t.minutes, 0))} hint="Cours et exercices" color="#c565e6" />
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm font-semibold text-ep-muted mr-3">Compétences</span>
          {LEVELS.map((l) => <Badge key={l.label} color={l.color}>{l.label}</Badge>)}
        </div>

        <div className="space-y-5">
          {project.skills.map((s, i) => (
            <SkillCard key={s.name} index={i} skill={s} onOpen={(kind) => setDrawer({ kind, skill: s })} />
          ))}
        </div>

        <button
          onClick={() => setGraphOpen(true)}
          className="mt-8 flex items-center gap-3 px-5 py-3 bg-white text-ep-bg font-semibold hover:bg-gray-200"
        >
          Voir le graphe de validation <ArrowRight size={18} />
        </button>
      </section>

      {graphOpen && <ValidationGraph projects={PROJECTS} focusId={projectId} onClose={() => setGraphOpen(false)} />}

      <Drawer
        open={drawer !== null}
        onClose={() => setDrawer(null)}
        kicker={drawer?.kind === "courses" ? "COURS DISPONIBLES" : "EXERCICES DISPONIBLES"}
        title={drawer?.skill.name}
      >
        {drawer?.kind === "courses" && drawer.skill.courses.map((c) => <CourseRow key={c.title} c={c} />)}
        {drawer?.kind === "exercises" && (
          <>
            <ExerciseSummary skill={drawer.skill} />
            {drawer.skill.exercises.map((e) => <ExerciseRow key={e.title} e={e} />)}
          </>
        )}
      </Drawer>
    </>
  );
}
