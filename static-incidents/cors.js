module.exports = async function (browser) {
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/login');

  const client = await page.target().createCDPSession();
  /*  await page.setDefaultNavigationTimeout(0); */
  await page.waitForTimeout(4000);
  await client.send('Runtime.evaluate', {
    includeCommandLineAPI: true,
    expression: `$.ajax({
      type: "POST",
      crossdomain: true,
      url: "https://en.gundam.info/",
      dataType: "json",
      data: JSON.stringify({
          anydata1: "any1",
          anydata2: "any2",
      }),
      success: function (result) {
          console.log(result)
      },
      error: function (xhr, status, err) {
          console.error(xhr, status, err);
      }
  });
  `,
  });

  await page.close();

  return { cors: 'worked' };
};
