import puppeteer from "puppeteer";

export const getResults = async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  try {
    if(!Number.isInteger(+req.query.id)) {throw('asdasd')};
    await page.goto(
      `https://www.transfermarkt.pl/team-name/spielplandatum/verein/${req.query.id}`,
      {
        waitUntil: "networkidle2",
      }
    );
    const results = await page.evaluate(() => {
      const table = document.querySelector(`.responsive-table table tbody`);
      
      const resultsArray = [];
      let competition = 0;
      
      const elementsArray = Array.from(table.querySelectorAll("tr"));
      elementsArray.map((element) => {
        if (!element.outerHTML.includes("<tr style")) {
          resultsArray.push([]);
          resultsArray[competition++].push(element.innerHTML);
        } else {
          resultsArray[competition - 1].push(element.innerHTML);
        }
      });
      return {
        results: resultsArray,
        teamName: document.getElementsByClassName('data-header__headline-wrapper data-header__headline-wrapper--oswald')[0].innerText,
      };
    });
    res.status(200).json(results);
  } catch (error) {
    res.status(400).send("Zły identyfikator zespołu" + error);
  }

  await browser.close();
};
