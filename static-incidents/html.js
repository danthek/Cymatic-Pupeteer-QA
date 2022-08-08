module.exports = async function (browser) {
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/login');

  const client = await page.target().createCDPSession();
  /*  await page.setDefaultNavigationTimeout(0); */
  await page.waitForTimeout(3000);
  await client.send('Runtime.evaluate', {
    includeCommandLineAPI: true,
    expression: `
    var s = document.createElement( 'iframe' );
    s.setAttribute( 'src', "https://www.nintendo.com/" );
    s.setAttribute( 'style', "height:500px;width:500px;top:0" );
    document.querySelector('body').appendChild( s );
    `,
  });

  await page.close();

  return { html: 'worked' };
};
