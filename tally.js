const puppeteer = require('puppeteer');
const agents = require('browser-agents');
const bronxVote = 'li#my_db_entry_191140347>div.ss_item_text_container>.votes';
const allVotes = '.votes';
const dest = 'https://a.pgtb.me/RbrpXd/n1kPk?w=67644150&e=191140347';

const connect = async () => {
  console.log('tallying');
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

  try {
    const votes = await page.$$(allVotes);
    const bVote = await page.$$(bronxVote);
    const bronxData = await (await bVote[0].getProperty('innerHTML')).jsonValue();
    const voteTally = votes.length;
    let voteList = [];
    let data;
    for (let i = 0; i < voteTally; i++) {
      data = await (await votes[i].getProperty('innerHTML')).jsonValue();
      voteList.push(data);
    }

    console.log('check tally', voteList.sort((a,b) => b - a))
    console.log('check bronx votes', bronxData)
  } catch(err) {
    console.log('selection not handled', err)
  }

  browser.close();
};

console.log('tally process see args', process.argv)
connect();
