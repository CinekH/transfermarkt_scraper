import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getResults } from "../api";
import { parseHTMLResults } from "../utils/parseHTMLResults";

import ModalWaiting from "./ModalWaiting";

import "./styles.css";

const Results = () => {
  const [results, setResults] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(async () => {
    const getData = async () => {
      try {
        const res = await getResults(params.id);
        if (typeof res === "string") {
          setResults(res);
        } else {
          setResults(parseHTMLResults(res, params.id));
        }
      } catch (error) {
        if (error.message !== "Request aborted") console.log(error);
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="container">
      {results === null && <ModalWaiting text={"Pobieranie wyników"} />}
      {results && typeof results === "string" && (
        <div className="return">
          <h2>{results}</h2>
          <button className="return-button" onClick={() => navigate("/")}>
            Wróć
          </button>
        </div>
      )}
      {results && typeof results !== "string" && (
        <>
          <div className="results">
            {results.map((result, x) => {
              return (
                <div className="results-group" key={x}>
                  {result.map((element, y) => {
                    return (
                      <React.Fragment key={`${x}${y}`}>
                        {element}
                      </React.Fragment>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="return">
            <button className="return-button" onClick={() => navigate("/")}>
              Wróć
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Results;
