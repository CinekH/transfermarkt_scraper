import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import searchRoutes from './routes/search.js';
import teamRoutes from './routes/teams.js'

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use('/search', searchRoutes);
app.use('/teams', teamRoutes);


const scrap = async () => {
    /*
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.transfermarkt.pl/schnellsuche/ergebnis/schnellsuche?query=manchester+united', {
        waitUntil: 'networkidle2',
    });
    const [site] = await page.$x('/html/body/div[3]/div[4]/div/div/div[2]/div/table');
    const data = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('#yw0 table tr'));
        let tb = []
        console.log(tds);
        return tb;
        //return tds.map((td, index) => [index] = td.innerHTML)
    });
    //const table = await imgTag.getProperty('src');
    console.log(data);
    //await page.pdf({ path: 'hn.pdf', format: 'a4' });

    await browser.close();
    */
}

const PORT = 5000;

try {
    app.listen(PORT, () => {
        console.log(`Server running on port : ${PORT}`);
        scrap();
    });
} catch (error) {
    console.log(error);
}