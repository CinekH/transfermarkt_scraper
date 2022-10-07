import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { parseHTMLTable } from "../utils/parseHTMLTable";

import { searchTeam } from "../api/index";

import ModalWaiting from "./ModalWaiting";

import './styles.css';

const dataLabels = {
  0: "",
  1: "Klub",
  2: "Liga",
  3: "Kraj",
  4: "Kadra",
  5: "Wartość rynkowa"
}

const SearchResults = () => {
  const [table, setTable] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(async () => {
    const getData = async (teamName) => {
      try {
        setTable(parseHTMLTable(await searchTeam(teamName)));
      } catch (error) {
        if (error.message !== "Request aborted") console.log(error);
      }
    }
    getData(params.teamName);
  }, []);

  const selectTeam = (url) => {
    navigate(`/results/${url.slice(url.indexOf('verein/') + 'verein/'.length)}`);
  }

  return (
    <div className="container">
      <div className="searchResults">
        {table === null && (
          <ModalWaiting text={'Pobieranie drużyn'} />
        )}
        {table?.HTMLTable.length === 0 && (
          <div className="return">
            <h2>Nie znaleziono drużyn o takiej nazwie</h2>
            <button className="return-button" onClick={() => navigate(`/`)}>Wróć</button>
          </div>
        )}
        {table?.HTMLTable.length > 0 && (
          <table>
            <thead>
              <tr>
                <th ></th>
                <th data-label="Klub">Klub</th>
                <th data-label="Liga">Liga</th>
                <th data-label="Kraj">Kraj</th>
                <th data-label="Kadra">Kadra</th>
                <th data-label="Wartość rynkowa">Wartość rynkowa</th>
              </tr>
            </thead>
            <tbody>
              {table.HTMLTable.map((row, indexRow) => {
                return (
                  <tr key={indexRow} onClick={() => selectTeam(table.hyperlinksTable[indexRow])}>
                    {row.map((element, indexElement) => {
                      return (
                        <td className={indexElement === 0 ? "club-image" : ""} data-label={dataLabels[indexElement]} key={`${indexRow}${indexElement}`}>{element}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
