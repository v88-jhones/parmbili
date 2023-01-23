const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { DEFAULT } = require("./constants");

let chrome_options = new chrome.Options().windowSize(DEFAULT.screen);
chrome_options.addArguments("--proxy-server='direct://'");
chrome_options.addArguments("--proxy-bypass-list=*");
// chrome_options.addArguments("--disable-gpu");
// chrome_options.addArguments("--headless"); 
// chrome_options.addArguments("--blink-settings=imagesEnabled=false"); 

/* Command to run test: NODE_ENV=development ./node_modules/.bin/mocha tests/frontend/*.test.js */

describe('Parmbili Unit Test', function() {
    this.timeout(DEFAULT.timeout);
    let driver;

    before(async function(){
        driver = await new Builder()
                .forBrowser("chrome")
                .setChromeOptions(chrome_options)
                .build(); 
        await driver.get(DEFAULT.link);
        await driver.manage().window().setRect(DEFAULT.screen);
    });

    beforeEach(async function(){
        await driver.sleep(1000);
    });

    after(async function() {
        await driver.quit();
    });

    it('Till', async function() {
        await driver.findElement(By.css(".tile:nth-child(1)")).click();
        await driver.wait(until.elementLocated(By.css(".popover .popover_btn")), 30000)
        await driver.findElement(By.css(".popover_btn")).click();
    })

    it('Plant', async function() {
         await driver.findElement(By.css(".popover_btn")).click();
    })

    it('Cancel Plant', async function() {
         await driver.findElement(By.css(".btn-secondary")).click();
    })

    it('Confirm Plant', async function() {
        await driver.findElement(By.css(".tilled")).click();
        await driver.wait(until.elementLocated(By.css(".popover .popover_btn")), 60000)
        await driver.findElement(By.css(".popover_btn")).click();
        await driver.wait(until.elementLocated(By.css(".modals .plant")), 60000)
        await driver.findElement(By.css(".plant:nth-child(1)")).click();
        await driver.findElement(By.css(".btn:nth-child(2)")).click();
        const elements = await driver.findElements(By.css(".has_plant"));
        assert(elements.length)
        assert(await driver.findElement(By.css(".earnings")).getText() == "Total Earnings: 40$");
    })

    it('Remove', async function() {
         await driver.findElement(By.css(".has_plant")).click();
         await driver.wait(until.elementLocated(By.css(".popover .btn-secondary")), 60000)
         await driver.findElement(By.css(".btn-secondary")).click();
    })

    it('Cancel Remove', async function() {
        await driver.findElement(By.css(".btn-danger")).click();
    })

    it('Confirm Remove', async function() {
        await driver.findElement(By.css(".tile.has_plant")).click();
        await driver.wait(until.elementLocated(By.css(".popover .btn-secondary")), 60000)
        await driver.findElement(By.css(".btn-secondary")).click();
        await driver.wait(until.elementLocated(By.css(".modals_action > .btn-secondary")), 60000)
        await driver.findElement(By.css(".modals_action > .btn-secondary")).click();
        const elements = await driver.findElements(By.css(".has_plant"));
        assert(!elements.length);
    })

    it("Plant corn", async function (){
        await driver.findElement(By.css(".tile:nth-child(1)")).click();
        await driver.wait(until.elementLocated(By.css(".popover .popover_btn")), 60000)
        await driver.findElement(By.css(".popover_btn")).click();
        await driver.wait(until.elementLocated(By.css(".popover .popover_btn")), 60000)
        await driver.findElement(By.css(".popover_btn")).click();
        await driver.wait(until.elementLocated(By.css(".modals_plants .plant")), 60000)
        await driver.findElement(By.css(".plant:nth-child(4)")).click();
        await driver.findElement(By.css(".btn:nth-child(2)")).click();
        assert(await driver.findElement(By.css(".earnings")).getText() == "Total Earnings: 5$");
    })

    it("Harvest corn", async function (){
        await driver.wait(until.elementLocated(By.css(".harvest")), 60000)
        await driver.findElement(By.css(".tile:nth-child(1)")).click();
        await driver.wait(until.elementLocated(By.css(".popover .popover_btn")), 60000)
        await driver.findElement(By.css(".popover_btn:nth-child(1)")).click();
        assert(await driver.findElement(By.css(".earnings")).getText() == "Total Earnings: 105$");
    })

    it("Plant Two corns", async function (){
        await driver.findElement(By.css(".tile:nth-child(1)")).click();
        await driver.wait(until.elementLocated(By.css(".popover .popover_btn")), 60000)
        await driver.findElement(By.css(".popover_btn")).click();
        await driver.findElement(By.css(".popover_btn")).click();
        await driver.findElement(By.css(".plant:nth-child(4)")).click();
        await driver.findElement(By.css(".btn:nth-child(2)")).click();
        assert(await driver.findElement(By.css(".earnings")).getText() == "Total Earnings: 70$");
        await driver.findElement(By.css(".tile:nth-child(2)")).click();
        await driver.wait(until.elementLocated(By.css(".popover .popover_btn")), 60000)
        await driver.findElement(By.css(".popover_btn")).click();
        await driver.findElement(By.css(".popover_btn")).click();
        await driver.findElement(By.css(".plant:nth-child(4)")).click();
        await driver.findElement(By.css(".btn:nth-child(2)")).click();
        assert(await driver.findElement(By.css(".earnings")).getText() == "Total Earnings: 35$");
    })

    it("Harvest two corns", async function (){
        await driver.wait(until.elementLocated(By.css(".harvest")), 60000)
        await driver.findElement(By.css(".harvest")).click();
        await driver.wait(until.elementLocated(By.css(".popover .popover_btn")), 60000)
        await driver.findElement(By.css(".popover_btn:nth-child(1)")).click();
        assert(await driver.findElement(By.css(".earnings")).getText() == "Total Earnings: 135$");
        await driver.wait(until.elementLocated(By.css(".harvest")), 60000)
        await driver.findElement(By.css(".harvest")).click();
        await driver.wait(until.elementLocated(By.css(".popover .popover_btn")), 60000)
        await driver.findElement(By.css(".popover_btn:nth-child(1)")).click();
        assert(await driver.findElement(By.css(".earnings")).getText() == "Total Earnings: 235$");
    })

    it("Expand land", async function (){
        await driver.findElement(By.css(".expand_btn")).click();
        assert(await driver.findElement(By.css(".earnings")).getText() == "Total Earnings: 55$");
        const elements = await driver.findElements(By.css(".tile:nth-child(25)"));
        assert(elements.length);
    })
})