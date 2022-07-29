module.exports = async function(browser){
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/login');
 
  const client = await page.target().createCDPSession();
  await page.waitForTimeout(3000);
  await client.send('Runtime.evaluate', {
    includeCommandLineAPI : true,
    expression : `
    $.post("/auth",{x:"javascript:alert('hello')"})
    `
  });

  await page.close(); 

  return { sql : 'worked' }
};


