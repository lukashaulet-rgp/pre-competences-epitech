import { useState } from "react";
import { Header, Sidebar } from "./ui";
import SkillsPage from "./SkillsPage";
import TournamentsPage from "./TournamentsPage";

export default function App() {
  const [page, setPage] = useState("skills");
  return (
    <div className="min-h-screen bg-ep-bg text-gray-200 font-sans">
      <p className="bg-ep-pink text-white text-center font-mono text-xs tracking-widest py-1.5">
        CONCEPT ÉTUDIANT — NON OFFICIEL • Maquette proposée pour l'intranet Epitech, données fictives
      </p>
      <Header />
      <div className="flex">
        <Sidebar page={page} setPage={setPage} />
        <main className="flex-1 min-w-0 px-8 py-6 space-y-14">
          {page === "skills" ? <SkillsPage /> : <TournamentsPage />}
        </main>
      </div>
    </div>
  );
}
