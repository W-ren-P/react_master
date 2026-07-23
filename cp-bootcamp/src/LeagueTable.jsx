import React, { useState, useEffect } from "react";

function LeagueTable() {
  const [tableRows, setTableRows] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    fetch("master_dict.json")
      .then((response) => response.text())
      .then((textData) => {
        const masterDict = JSON.parse(textData);
        // console.log("masterDict:");
        // console.log(masterDict);
        // console.log("typeof masterDict:");
        // console.log(typeof masterDict);
        // debugger;

        return fetch("bundesliga_table_2022_23.csv")
          .then((response_b) => {
            // console.log("response_b:");
            // console.log(response_b);
            // debugger;
            return response_b.text();
          })
          .then((tableData) => {
            // console.log("response_b:");
            // console.log(response_b);
            // debugger;
            // const rows = data.split("\n");
            const rows = tableData.split(/\r?\n/);
            // console.log("rows:");
            // console.log(rows);
            console.log(JSON.stringify(tableData));
            // console.log("rows[0]:");
            // console.log(rows[0]);
            // console.log("typeof rows[0]:");
            // console.log(typeof rows[0]);

            const parsedHeaders = rows[0].split(",");

            setHeaders(parsedHeaders); // Save headers to state

            // console.log("headers:");
            // console.log(headers);
            // console.log("typeof header:");
            // console.log(typeof headers);
            // console.log("Array.isArray(headers:");
            // console.log(Array.isArray(headers));
            // console.log("headers[0]:");
            // console.log(headers[0]);
            // console.log("typeof headers[0]:");
            // console.log(typeof headers[0]);
            // debugger;

            // const headRow = document.getElementById("table-head");

            // console.log("headRow:");
            // // console.log(headRow);
            // console.log(headRow.innerHTML);
            // console.log("typeof headRow:");
            // console.log(typeof headRow);

            // headers.forEach((header) => {
            //   headRow.innerHTML += `<th>${header}</th>`;
            // });

            // console.log("headRow:");
            // // console.log(headRow);
            // console.log("headRow.innerHTML");
            // console.log(headRow.innerHTML);
            // console.log("typeof headRow:");
            // console.log(typeof headRow);
            // debugger;

            // const body = document.getElementById("table-body");

            // console.log("body:");
            // console.log(body.innerHTML);
            // debugger;

            const teamColumnIndex = parsedHeaders.indexOf("Team");

            const compiledRows = [];

            // console.log("teamColumnIndex:");
            // console.log(teamColumnIndex);
            // console.log("typeof teamColumnIndex");
            // console.log(typeof teamColumnIndex);

            // console.log("cells: ");
            for (let i = 1; i < rows.length; i++) {
              if (!rows[i]) continue;
              const cells = rows[i].split(",");
              // console.log("cells: ");
              // console.log(cells);
              // console.log(cells[0]);
              // console.log(rows[1].split(","));
              // debugger;

              // let rowHtml = "<tr>";

              //   cells.forEach((cell) => {
              //     rowHtml += `<td>${cell}</td>`;
              //   });

              // cells.forEach((cell, index) => {
              //   if (index === teamColumnIndex) {
              //     const translatedTeam = masterDict[cell.trim()] || cell;
              //     rowHtml += `<td>${translatedTeam}</td>`;
              //   } else {
              //     rowHtml += `<td>${cell}</td>`;
              //   }

              const processedCells = cells.map((cell, index) => {
                if (index === teamColumnIndex) {
                  return masterDict[cell.trim()] || cell;
                }
                return cell;
              });

              // rowHtml += "</tr>";
              // body.innerHTML += rowHtml;

              compiledRows.push(processedCells);
            }
            // console.log("rows[1].split(", "): ");
            // console.log(rows[1].split(","));

            setTableRows(compiledRows); // Save processed rows to state
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
