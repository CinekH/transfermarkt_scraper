import { Parser } from 'html-to-react';

export const parseHTMLResults = (response, id) => {
  let lastMatch = false;
  const domParser = new DOMParser();
  const parser = new Parser();
  const HTMLResults = response.results.reduce((resultsArray, resultsGroup, rowIndex) => {
    if(lastMatch) return resultsArray;
    resultsArray[rowIndex] = [];
    resultsGroup.map((result, index)=> {
      if(lastMatch) return null;
      if(index === 0) {
        const parsedResult = domParser.parseFromString(result, 'text/html');

        resultsArray[rowIndex].push(parser.parse(`<div key=${rowIndex}${index} className="results-competition">${
          parsedResult.images[0].outerHTML}${
          `<span>${parsedResult.getElementsByTagName('a')[0].innerText}</span>`}</div>`));  
      } else {
        const htmlObject = parser.parse(result);
        const oponentImg = domParser.parseFromString(result, 'text/html').images[0].outerHTML;
        const teamImg = `<img src="https://tmssl.akamaized.net/images/wappen/tiny/${id}.png" title="&nbsp;" alt="${response.teamName}" class="tiny_wappen">`;
        let score = htmlObject[19]?.props?.children?.props?.children?.props;
        let printedScore = htmlObject[19]?.props?.children?.props?.children?.props?.children;
        if(score === undefined) {
          score = {
            children: 'Przełożony',
            className: "",
          }
          printedScore = "Przełożony";
        }
        if(score.children.includes('-:-')) {
          lastMatch = true;
          if (index === 1) resultsArray.pop();
          return null;
        };
        const resultDate = `<span className="results-date">${htmlObject[3].props.children.replace(/[^\d.]/g,'').slice(1)}</span>`;
        const oponentName = `<span className="results-team">${htmlObject[11].props.children.props.title}</span>`;
        const teamName = `<span className="results-team">${response.teamName}</span>`;
        if(typeof(printedScore) === 'object') {
          printedScore = `${printedScore[0]}<span className="results-penalty-shootout">${printedScore[1].props.children}</span>`;
        }
        
        resultsArray[rowIndex].push(parser.parse(
          `<div key=${rowIndex}${index} className="results-result">${
              resultDate}<div className="results-match">${
                htmlObject[7].props.children === 'G' ? `${teamImg}${teamName}${
                `<span className="${score.className} results-score">${
                printedScore}</span>`}${oponentName}${oponentImg}` : 
                `${oponentImg}${oponentName}${`<span className="${
                score.className} results-score">${printedScore}</span>`}${
                teamName}${teamImg}`}</div></div>`
          ));
      }
    });
    return resultsArray;
  }, []);
  return HTMLResults;
};
