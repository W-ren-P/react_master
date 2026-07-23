import React, { useState, useEffect } from "react";

const assetUrl = (file) => `${import.meta.env.BASE_URL}${file}`;

function LeagueTable() {
  const [tableRows, setTableRows] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    fetch(assetUrl(`${import.meta.env.BASE_URL}master_dict.json`))
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to load master_dict.json (${response.status})`,
          );
        }
        return response.text();
      })
      .then((textData) => {
        const masterDict = JSON.parse(textData);

        return fetch(
          assetUrl(import.meta.env.BASE_URL + "bundesliga_table_2022_23.csv"),
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `Failed to load bundesliga_table_2022_23.csv (${response.status})`,
              );
            }
            return response.text();
          })
          .then((tableData) => {
            const rows = tableData.split(/\r?\n/);
            const parsedHeaders = rows[0].split(",");

            setHeaders(parsedHeaders);

            const teamColumnIndex = parsedHeaders.indexOf("Team");
            const compiledRows = [];

            for (let i = 1; i < rows.length; i++) {
              if (!rows[i]) continue;
              const cells = rows[i].split(",");

              const processedCells = cells.map((cell, index) => {
                if (index === teamColumnIndex) {
                  return masterDict[cell.trim()] || cell;
                }
                return cell;
              });

              compiledRows.push(processedCells);
            }

            setTableRows(compiledRows);
          });
      })
      .catch((error) => console.error("Error loading files:", error));
  }, []);

  return (
    <div className="table_container">
      {tableRows.length === 0 ? (
        <p>Loading league table...</p>
      ) : (
        <table>
          <thead>
            <tr>
              {headers.map((header, idx) => (
                <th key={idx}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LeagueTable;
