function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

module.exports = async function (browser, finalUser, finalPass) {

    
    const page = await browser.newPage();
    /*  await page.setDefaultNavigationTimeout(0); */
    await page.goto('http://localhost:3000/login');
    await page.waitForTimeout(15000);
    
    await page.type(
      '#form > input:nth-child(2)',
      finalUser ? finalUser : 'user@nomail.com',
      { delay: 100 }
      ),
      await page.type(
        '#form > input:nth-child(4)',
        finalPass ? finalPass : 'password',
        { delay: 100 }
        ),
        await page.click(
          '#root > div > div > div > div > div.card > div > form > button'
          ),
          /*     await page.waitForTimeout(1000); */
          /*    await page.waitForNavigation(); */
          console.log('//////// Login ////////');
          
          console.log('user: ', finalUser);
          console.log('password: ', finalPass);
          await delay(7000);
        
          await page.close();
          return { Login: 'worked' };
        };
        