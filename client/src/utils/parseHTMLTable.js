import { Parser } from 'html-to-react';

export const parseHTMLTable = (response) => {
  const hyperlinksTable = [];
  console.log(response);
  const HTMLTable = response.reduce((newRow, row, rowIndex) => {
    if (rowIndex % 3 === 1) {
      newRow.push(
        row.reduce((result, element, index) => {
          if (index !== 1 && index < 7) {
            if (element.includes(`</a>`)) {
              if(index === 2) hyperlinksTable.push(element.slice(element.indexOf('href="') + 'href="'.length, element.lastIndexOf('"')));
              result.push(
                Parser().parse(element.replace(/<\/?[^>]+(>|$)/g, ""))
              );
            } else {
              result.push(Parser().parse(element));
            }
          }
          return result;
        }, [])
      );
    }
    return newRow;
  }, []);
  return {HTMLTable, hyperlinksTable};
};
