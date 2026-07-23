import { useEffect, useState } from "react";

// function Matches_components() {
//   return (
//     <>
//       <p class="page_title">Matches</p>
//     </>
//   );
// }

function Matches_components({ limit = 10 }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_KEY = "0994e7f21f1b463ba18f286b06cd2914";
    const Days_range = 10;

    const today = new Date().toISOString().split("T")[0];
    const Days_ago = new Date(Date.now() - Days_range * 86400000)
      .toISOString()
      .split("T")[0];

    const fetchMatches = () => {
      // Build URL with the date parameters attached
      const targetUrl = `https://api.football-data.org/v4/matches?dateFrom=${Days_ago}&dateTo=${today}`;

      fetch("https://corsproxy.io/?" + encodeURIComponent(targetUrl), {
        headers: { "X-Auth-Token": API_KEY },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("API Response:", data);
          if (data.matches) {
            // Sort by date (newest first)
            const sorted = data.matches.sort(
              (a, b) => new Date(b.utcDate) - new Date(a.utcDate),
            );
            setMatches(sorted.slice(0, limit));
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching matches:", err);
          setLoading(false);
        });
    };

    // Initial fetch
    fetchMatches();

    // Auto-refresh every 2 minutes for live updates
    const interval = setInterval(fetchMatches, 120000);
    return () => clearInterval(interval);
  }, [limit]);

  if (loading) return <p>Loading matches...</p>;

  return (
    <>
      <p className="page_title">Matches</p>

      <div className="table_container_c">
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Competition</th>
              <th>Match</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match.id}>
                <td>
                  {match.status === "IN_PLAY" ? (
                    <strong style={{ color: "red" }}>LIVE</strong>
                  ) : match.status === "PAUSED" ? (
                    <strong>HT</strong>
                  ) : (
                    new Date(match.utcDate).toLocaleDateString()
                  )}
                </td>
                <td>{match.competition.name}</td>
                <td>
                  {match.homeTeam.name} vs {match.awayTeam.name}
                </td>
                <td>
                  {match.score.fullTime.home ?? 0} -{" "}
                  {match.score.fullTime.away ?? 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Matches_components;
