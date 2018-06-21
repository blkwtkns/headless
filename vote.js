const puppeteer = require('puppeteer');
const agents = require('browser-agents');
const bronxBox = 'li#my_db_entry_191140347>div.item_vote>a';
// const blanketBox = 'li#my_db_entry_190906199>div.item_vote>a';
const votesList = '.votes';
const dest = 'https://a.pgtb.me/RbrpXd/n1kPk?w=67644150&e=191140347';

const vote = async (voteNumber = 0) => {
  console.log('voting', voteNumber);
  const options = { executablePath: '/usr/bin/google-chrome-unstable' };
  const browser = await puppeteer.launch(options);
  // const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  const userAgent = agents.random();

  try {
    await page.setUserAgent(userAgent);
  } catch(err) {
    console.log('userAgent not handled', err)
  }

  try {
    await page.goto(dest, {waitUntil: 'networkidle2'});
  } catch(err) {
    console.log('goto ops not handled', err)
  }
  // await page.focus(selector);
  try {
    await page.waitFor(2000);
  } catch(err) {
    console.log('wait ops not handled', err)
  }

  // click element
  try {
    await page.click(bronxBox);
  } catch(err) {
    console.log('selection not handled', err)
  }

  // await page.screenshot({
  //   path: 'proof.png',
  //   fullPage: true
  // })
  browser.close();
};

for (let i = 0; i < 10; i++) {
  setTimeout(() => vote(i), 1);
}
