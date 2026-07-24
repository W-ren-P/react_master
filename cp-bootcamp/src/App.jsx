import { useState } from "react";
import { Route, Routes } from "react-router";

import "./App.css";
import Header from "./components/Header";
import HomePage_LeagueTable from "./pages/HomePage_LeagueTable";
import Teams_components from "./components/Teams_components";
import TeamsPage from "./pages/TeamsPage";
import Players_components from "./components/Players_components";
import PlayersPage from "./pages/PlayersPage";
import Matches_components from "./components/Matches_components";
import MatchesPage from "./pages/MatchesPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage_LeagueTable />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path="/matches" element={<MatchesPage />} />
      </Routes>
    </>
  );
}

export default App;
