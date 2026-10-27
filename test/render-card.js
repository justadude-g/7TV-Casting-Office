// node test/render-card.js <id> <outPrefix>  -> writes full-res PNGs of front and back
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
(async () => {
  const ids = process.argv[2]; const out = process.argv[3];
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto((process.env.BASE || 'http://localhost:8765/') + 'test/harness.html?ids=' + ids);
  await p.waitForSelector('body[data-done]');
  for (const id of ids.split(',')) for (const side of ['front', 'back']) {
    const data = await p.$eval('#' + side + '-' + id, (c) => c.toDataURL('image/png'));
    fs.writeFileSync(`${out}-${id}-${side}.png`, Buffer.from(data.split(',')[1], 'base64'));
  }
  await b.close();
})();
