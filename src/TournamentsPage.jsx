import { useState } from "react";
import { Trophy, Lock, Award, Users, Medal } from "lucide-react";
import { ME, CREDITS_FOR_CERTIF, WEEK, WEEKLY, HISTORY, REWARDS, CERTIFS } from "./data";
import { Hero, Stat, SectionTitle, Badge, TintButton } from "./ui";

const GOLD = "#e6b93d";

function WeeklyCard({ t }) {
  const myRank = t.board.findIndex((r) => r.login === ME.login) + 1;
  return (
    <div className="flex flex-wrap items-center gap-8 bg-ep-panel border border-ep-line border-l-4 border-l-ep-orange p-7">
      <div className="w-36 shrink-0">
        <p className="font-mono text-[11px] tracking-widest text-ep-orange">SE TERMINE DANS_</p>
        <p className="font-title text-4xl text-ep-orange mt-1">{t.endsIn.toUpperCase()}</p>
      </div>
      <div className="flex-1 min-w-[240px]">
        <div className="flex items-center gap-2">
          <Trophy size={15} className="text-ep-muted" />
          <Badge color="#ef6b3f">{t.promo}</Badge>
        </div>
        <p className="font-semibold text-white text-2xl mt-2">Tournoi {t.project}</p>
        <p className="text-ep-muted mt-1">
          {t.players} participants • ta position : <span className="text-ep-blue font-semibold">#{myRank}</span>
        </p>
      </div>
      <TintButton color="#5fcf91">CONTINUER LE TOURNOI</TintButton>
    </div>
  );
}

function Leaderboard({ board }) {
  return (
    <div className="bg-ep-panel border border-ep-line">
      {board.map((row, i) => {
        const me = row.login === ME.login;
        return (
          <div key={row.login} className={`flex items-center gap-5 px-6 py-4 border-b border-ep-line last:border-b-0 ${me ? "bg-ep-blue/10" : ""}`}>
            <span className="font-title text-2xl w-10" style={{ color: i === 0 ? GOLD : "#9a9a9a" }}>#{i + 1}</span>
            <span className={`flex-1 truncate ${me ? "text-ep-blue font-semibold" : "text-white"}`}>
              {row.login} {me && <span className="font-mono text-xs">(toi)</span>}
            </span>
            <span className="font-mono text-sm text-ep-muted w-14 text-right">{row.time}</span>
            <span className="font-mono text-sm text-white w-16 text-right">{row.score} pts</span>
            <span className="w-24 text-right">{i === 0 && <Badge color="#5fcf91">+1 CRÉDIT</Badge>}</span>
          </div>
        );
      })}
    </div>
  );
}

function OtherPromo({ t }) {
  return (
    <div className="flex items-center gap-4 bg-ep-panel border border-ep-line p-5">
      <div className="w-11 h-11 shrink-0 flex items-center justify-center border border-ep-line text-ep-muted">
        <Lock size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[11px] tracking-widest text-ep-muted">{t.promo}_</p>
        <p className="font-semibold text-white truncate">Tournoi {t.project}</p>
      </div>
      <span className="flex items-center gap-1.5 font-mono text-xs text-ep-muted">
        <Users size={13} /> {t.players}
      </span>
    </div>
  );
}

function RewardTrack() {
  const next = REWARDS.find((r) => r.at > ME.credits);
  return (
    <div className="bg-ep-panel border border-ep-line p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="font-mono text-xs tracking-widest text-ep-muted">TES CRÉDITS TOURNOI_</p>
        <p className="font-mono text-sm text-ep-muted">
          <span className="font-title text-4xl text-ep-green">{ME.credits}</span> / {CREDITS_FOR_CERTIF}
        </p>
      </div>

      {/* 20 cases ; les paliers de récompense sont marqués au-dessus */}
      <div className="grid grid-cols-20 gap-1 mt-5">
        {Array.from({ length: CREDITS_FOR_CERTIF }, (_, i) => {
          const reward = REWARDS.find((r) => r.at === i + 1);
          return (
            <div key={i} className="relative">
              {reward && <Medal size={14} className="absolute -top-5 right-0" style={{ color: i < ME.credits ? "#5fcf91" : "#6a6a6a" }} />}
              <div className={`h-4 ${i < ME.credits ? "bg-ep-green" : "bg-[#3a3a3a]"}`} />
            </div>
          );
        })}
      </div>
      {next && (
        <p className="font-mono text-xs text-ep-orange mt-4">
          Encore {next.at - ME.credits} victoire{next.at - ME.credits > 1 ? "s" : ""} pour : {next.title}
        </p>
      )}

      <div className="grid grid-cols-2 xl:grid-cols-5 gap-3 mt-7">
        {REWARDS.map((r) => {
          const got = ME.credits >= r.at;
          const isNext = r === next;
          const color = got ? "#5fcf91" : isNext ? "#8d9df6" : "#6a6a6a";
          return (
            <div key={r.at} className="bg-ep-bg border border-ep-line border-t-4 p-5" style={{ borderTopColor: color }}>
              <p className="font-mono text-[11px] tracking-widest" style={{ color }}>
                {r.at} CRÉDITS_ {got ? "OBTENU ✓" : isNext ? "PROCHAIN" : ""}
              </p>
              <p className="font-semibold text-white mt-2">{r.title}</p>
              <p className="text-sm text-ep-muted mt-1 leading-relaxed">{r.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CertifCard({ c, chosen, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-left p-5 border transition ${chosen ? "border-ep-pink bg-ep-pink/10" : "border-ep-line bg-ep-panel hover:bg-[#303030]"}`}
    >
      <div className="flex items-center justify-between">
        <Award size={22} className={chosen ? "text-ep-pink" : "text-ep-muted"} />
        <Badge color={chosen ? "#d14fd8" : "#9a9a9a"}>-50 %</Badge>
      </div>
      <p className="font-mono text-[11px] tracking-widest text-ep-muted mt-4">{c.tag}_</p>
      <p className="font-semibold text-white mt-0.5">{c.name}</p>
      <p className="text-sm text-ep-muted">{c.org}</p>
      {chosen && <p className="font-mono text-[11px] text-ep-pink mt-3">TON OBJECTIF_</p>}
    </button>
  );
}

function HistoryRow({ h }) {
  const win = h.rank === 1;
  return (
    <div className="flex items-center gap-5 bg-ep-panel border border-ep-line border-l-4 px-6 py-4" style={{ borderLeftColor: win ? GOLD : "#3a3a3a" }}>
      <div className="w-16 shrink-0">
        <p className="font-mono text-[10px] tracking-widest text-ep-blue">SEMAINE_</p>
        <p className="font-title text-2xl text-ep-blue">{h.week}</p>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white truncate">{h.project}</p>
        <p className="font-mono text-xs text-ep-muted">#{h.rank} sur {h.players}</p>
      </div>
      {win ? <Badge color="#5fcf91">+1 CRÉDIT</Badge> : <span className="font-mono text-xs text-ep-muted">—</span>}
    </div>
  );
}

export default function TournamentsPage() {
  const [certif, setCertif] = useState("ai900");
  const mine = WEEKLY.find((t) => t.promo === ME.promo);
  const others = WEEKLY.filter((t) => t.promo !== ME.promo);
  const next = REWARDS.find((r) => r.at > ME.credits);

  return (
    <>
      <Hero
        title="TOURNOIS"
        text="Chaque semaine, chaque promo a son tournoi sur un de ses projets. Finis 1er pour gagner 1 crédit tournoi. À 20 crédits, ta certification est payée à moitié."
      >
        <Stat label="CRÉDITS TOURNOI" value={`${ME.credits} / ${CREDITS_FOR_CERTIF}`} hint="1 victoire = 1 crédit" />
        <Stat label="PROCHAINE RÉCOMPENSE" value={`${next.at} CR.`} hint={next.title} />
        <Stat label="TOURNOI EN COURS" value={`SEMAINE ${WEEK}`} hint={`Fin dans ${mine.endsIn}`} />
      </Hero>

      <section>
        <SectionTitle color="#ef6b3f" right={`SEMAINE ${WEEK}`}>TOURNOI DE LA SEMAINE</SectionTitle>
        <WeeklyCard t={mine} />
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] gap-10">
        <section className="min-w-0">
          <SectionTitle color="#d14fd8" right="1ER = +1 CRÉDIT">CLASSEMENT</SectionTitle>
          <Leaderboard board={mine.board} />
        </section>
        <section>
          <SectionTitle color="#8d9df6">AUTRES PROMOS</SectionTitle>
          <div className="space-y-3">
            {others.map((t) => <OtherPromo key={t.promo} t={t} />)}
          </div>
        </section>
      </div>

      <section>
        <SectionTitle color="#5fcf91" right="PALIERS">RÉCOMPENSES</SectionTitle>
        <RewardTrack />
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_420px] gap-10">
        <section className="min-w-0">
          <SectionTitle color="#c565e6" right={`À ${CREDITS_FOR_CERTIF} CRÉDITS`}>CERTIFICATION -50 %</SectionTitle>
          <div className="grid grid-cols-2 gap-3">
            {CERTIFS.map((c) => <CertifCard key={c.id} c={c} chosen={certif === c.id} onClick={() => setCertif(c.id)} />)}
          </div>
        </section>
        <section>
          <SectionTitle color={GOLD}>HISTORIQUE</SectionTitle>
          <div className="space-y-3">
            {HISTORY.map((h) => <HistoryRow key={h.week} h={h} />)}
          </div>
        </section>
      </div>
    </>
  );
}
