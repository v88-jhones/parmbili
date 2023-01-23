const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { DEFAULT } = require("./constants");

let chrome_options = new chrome.Options().windowSize(DEFAULT.screen);
chrome_options.addArguments("--proxy-server='direct://'");
chrome_options.addArguments("--proxy-bypass-list=*");
chrome_options.addArguments("--headless"); 
chrome_options.addArguments("--disable-gpu");
chrome_options.addArguments("--blink-settings=imagesEnabled=false"); 

/* Command to run test: ./node_modules/mocha/bin/mocha/ tests/frontend */

describe('Parmbili Unit Test', function() {
    this.timeout(DEFAULT.timeout);
    let driver;

    const clickByCss = async (element, delay = 500) => {
        await driver.sleep(delay);
        await driver.findElement(By.css(element)).click();
    }

    before(async function(){
        driver = await new Builder()
                .forBrowser("chrome")
                .setChromeOptions(chrome_options)
                .build(); 
        await driver.get(DEFAULT.link);
        await driver.manage().window().setRect(DEFAULT.screen);
    });

    after(async function() {
        await driver.quit();
    });

    it('Till', async function() {
        await clickByCss(".parmbili_container");
        await clickByCss(".tile:nth-child(1)");
        await clickByCss(".popover_btn");
    })

    it('Plant', async function() {
        await clickByCss(".popover_btn");
    })

    it('Cancel Plant', async function() {
        await clickByCss(".btn-secondary");
    })

    it('Confirm Plant', async function() {
        await clickByCss(".tilled");
        await clickByCss(".popover_btn");
        await clickByCss(".plant:nth-child(1)");
        await clickByCss(".btn:nth-child(2)");
        const elements = await driver.findElements(By.css(".has_plant"));
        assert(elements.length)
        assert(await driver.findElement(By.css(".earnings")).getText() == "Total Earnings: 40$");
    })

    it('Remove', async function() {
        await clickByCss(".has_plant");
        await clickByCss(".btn-secondary");
    })

    it('Cancel Remove', async function() {
        await clickByCss(".btn-danger");
    })

    it('Confirm Remove', async function() {
        await clickByCss(".tile.has_plant");
        await clickByCss(".btn-secondary");
        await clickByCss(".btn-secondary");
        const elements = await driver.findElements(By.css(".has_plant"));
        assert(!elements.length);
    })

    it("Farm", async function (){
        await clickByCss(".parmbili_container");
        await clickByCss(".tile:nth-child(1)");
        await clickByCss(".popover_btn");
        await clickByCss(".popover_btn");
        await clickByCss(".plant:nth-child(4)");
        await clickByCss(".btn:nth-child(2)");
        assert(await driver.findElement(By.css(".earnings")).getText() == "Total Earnings: 5$");
        await driver.sleep(60000);
    })

    it("Harvest", async function (){
        await clickByCss(".tile:nth-child(1)");
        await clickByCss(".popover_btn:nth-child(1)");
        assert(await driver.findElement(By.css(".earnings")).getText() == "Total Earnings: 105$");
    })

    it("Farm again", async function (){
        await clickByCss(".tile:nth-child(1)");
        await clickByCss(".popover_btn");
        await clickByCss(".popover_btn");
        await clickByCss(".plant:nth-child(4)");
        await clickByCss(".btn:nth-child(2)");
        assert(await driver.findElement(By.css(".earnings")).getText() == "Total Earnings: 70$");
        await clickByCss(".tile:nth-child(2)");
        await clickByCss(".popover_btn");
        await clickByCss(".popover_btn");
        await clickByCss(".plant:nth-child(4)");
        await clickByCss(".btn:nth-child(2)");
        assert(await driver.findElement(By.css(".earnings")).getText() == "Total Earnings: 35$");
        await driver.sleep(60000);
    })

    it("Harvest again", async function (){
        await clickByCss(".harvest");
        await clickByCss(".popover_btn:nth-child(1)");
        assert(await driver.findElement(By.css(".earnings")).getText() == "Total Earnings: 135$");
        await clickByCss(".harvest");
        await clickByCss(".popover_btn:nth-child(1)");
        assert(await driver.findElement(By.css(".earnings")).getText() == "Total Earnings: 235$");
    })

    it("Expand land", async function (){
        await clickByCss(".expand_btn");
        assert(await driver.findElement(By.css(".earnings")).getText() == "Total Earnings: 55$");
        const elements = await driver.findElements(By.css(".tile:nth-child(25)"));
        assert(elements.length);
    })
})