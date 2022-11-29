import puppeteer from 'puppeteer';

export const searchTeam = async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0); 
    await page.goto(`https://www.transfermarkt.pl/schnellsuche/ergebnis/schnellsuche?query=${req.query.team_name.replace(' ', '+')}`, {
        waitUntil: 'networkidle2',
    });
    const searchingResults = await page.evaluate(() => {
        const tables = document.querySelectorAll('.large-12');
        const tableHeaders = Array.from(tables, table => table.innerHTML);
        const teamTableIndex = tableHeaders.findIndex((element) => {return element.includes('Lista drużyn')});
        const rows = document.querySelectorAll(`#yw${teamTableIndex} table tr`);
        const arrayOfRows = Array.from(rows, row => {
            const columns = row.querySelectorAll('td');
            return Array.from(columns, column => column.innerHTML);
        })
        return arrayOfRows;
    });
    await browser.close();
    res.status(200).json(searchingResults);
}