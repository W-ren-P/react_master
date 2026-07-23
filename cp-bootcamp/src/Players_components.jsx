import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const assetUrl = (file) => `${import.meta.env.BASE_URL}${file}`;

function Players_components() {
  const [players, setPlayers] = useState([]);
  const [masterDict, setMasterDict] = useState({});
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const dictResponse = await fetch(assetUrl("master_dict.json"));
        if (!dictResponse.ok) {
          throw new Error(
            `Failed to load master_dict.json (${dictResponse.status})`,
          );
        }
        const dict = await dictResponse.json();
        setMasterDict(dict);

        const { data, error } = await supabase
          .from("bundesliga_players_2022_23")
          .select("*");
        if (error) {
          throw error;
        }
        setPlayers(data ?? []);
      } catch (error) {
        console.error("Error fetching players:", error);
        setLoadError(error.message);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <>
      <p className="page_title">Players</p>
      <p className="page_subtitle">Leading scorers</p>

      {loadError ? (
        <p>Error loading player data: {loadError}</p>
      ) : players.length === 0 ? (
        <p>Loading player data...</p>
      ) : (
        <div className="table_container_b">
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Team</th>
                <th>Apps</th>
                <th>Mins</th>
                <th>Goals</th>
                <th>Assists</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.Player_index}>
                  <td>{player.Player}</td>
                  <td>{masterDict[player.Team.trim()] || player.Team}</td>
                  <td>{player.Apps}</td>
                  <td>{player.Min}</td>
                  <td>{player.G}</td>
                  <td>{player.A}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Players_components;
