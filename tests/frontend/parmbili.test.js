const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { DEFAULT } = require("./constants");

let chrome_options = new chrome.Options().windowSize(DEFAULT.screen);
chrome_options.addArguments("--proxy-server='direct://'");
chrome_options.addArguments("--proxy-bypass-list=*");
chrome_options.addArguments("--disable-gpu");
chrome_options.addArguments("--headless"); 
chrome_options.addArguments("--blink-settings=imagesEnabled=false"); 

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

    /* This will plant a crop in a specified tile */
    const plantCrop = async (tile, targetPlant, isTilled = true) => {
        let popover_plant = By.css(".popover .popover_btn");
        let modal_plant = By.css(".modals_plants .plant");
        let plant_btn = By.css(".btn:nth-child(2)");
        let plant = By.css(targetPlant);

        await driver.findElement(tile).click();
        await driver.wait(until.elementLocated(popover_plant), 60000)
        await driver.findElement(popover_plant).click();

        if(!isTilled){
            await driver.findElement(popover_plant).click();
        }

        await driver.wait(until.elementLocated(modal_plant), 60000);
        await driver.findElement(plant).click();
        await driver.findElement(plant_btn).click();
    }

    /* This will harvest plant in a specified tile */
    const harvestCrop = async (tile) => {
        let popover_harvest = By.css(".popover .popover_btn");
        let harvest_btn = By.css(".popover_btn:nth-child(1)");

        await driver.findElement(tile).click();
        await driver.wait(until.elementLocated(popover_harvest), 60000)
        await driver.findElement(harvest_btn).click();
        await driver.sleep(500);
    }

    /* Will till the tile */
    it('Till', async function() {
        let first_tile = By.css(".tile:nth-child(1)");
        let popver_btn = By.css(".popover .popover_btn")

        await driver.findElement(first_tile).click();
        await driver.wait(until.elementLocated(popver_btn), 30000)
        await driver.findElement(By.css(".popover_btn")).click();
    })

    /* Will plant on tilled tile */
    it('Plant', async function() {
        let popver_btn = By.css(".popover_btn")
        await driver.findElement(popver_btn).click();
    })

    /* Will cancel plant action */
    it('Cancel Plant', async function() {
         await driver.findElement(By.css(".btn-secondary")).click();
    })

    /* Will plant a selected crop on tilled tile */
    it('Confirm Plant', async function() {
        let tilled = By.css(".tilled");
        let has_plant = By.css(".has_plant");
        let earnings = By.css(".earnings");

        await plantCrop(tilled, DEFAULT.plants.potato);
        const elements = await driver.findElements(has_plant);
        assert(elements.length)
        assert(await driver.findElement(earnings).getText() == "Total Earnings: 40$");
    })

    /* Will click the onprogress plant and show the remove popover */
    it('Remove', async function() {
        let has_plant = By.css(".has_plant");
        let popover_remove_btn = By.css(".popover .btn-secondary");

        await driver.findElement(has_plant).click();
        await driver.wait(until.elementLocated(popover_remove_btn), 60000)
        await driver.findElement(popover_remove_btn).click();
    })

    /* Will cancel the remove popover*/
    it('Cancel Remove', async function() {
        let cancel_btn = By.css(".btn-danger");
        await driver.findElement(cancel_btn).click();
    })

    /* Will remove the crop/plant in tile */
    it('Confirm Remove', async function() {
        let has_plant = By.css(".tile.has_plant");
        let popver_remove_btn = By.css(".popover .btn-secondary");
        let modal_remove_btn = By.css(".modals_action > .btn-secondary");

        await driver.findElement(has_plant).click();
        await driver.wait(until.elementLocated(popver_remove_btn), 60000)
        await driver.findElement(popver_remove_btn).click();
        await driver.wait(until.elementLocated(modal_remove_btn), 60000)
        await driver.findElement(modal_remove_btn).click();
        const elements = await driver.findElements(has_plant);
        assert(!elements.length);
    })

    /* Will plant corn on tile */
    it("Plant corn", async function (){
        let first_tile = By.css(".tile:nth-child(1)");
        let earnings = By.css(".earnings");

        await plantCrop(first_tile, DEFAULT.plants.corn, false);
        assert(await driver.findElement(earnings).getText() == "Total Earnings: 5$");
    })

    /* Will harvest corn on tile */
    it("Harvest corn", async function (){
        let first_tile = By.css(".tile:nth-child(1)");
        let earnings = By.css(".earnings");

        await driver.wait(until.elementLocated(By.css(".harvest")), 60000)
        await harvestCrop(first_tile);
        assert(await driver.findElement(earnings).getText() == "Total Earnings: 105$");
    })

    /* Will plant two corns on tile */
    it("Plant Two corns", async function (){
        let first_tile = By.css(".tile:nth-child(1)");
        let second_tile = By.css(".tile:nth-child(2)");
        let earnings = By.css(".earnings");
        
        await plantCrop(first_tile, DEFAULT.plants.corn, false);
        assert(await driver.findElement(earnings).getText() == "Total Earnings: 70$");
        await driver.sleep(300);
        await plantCrop(second_tile, DEFAULT.plants.corn, false);
        assert(await driver.findElement(earnings).getText() == "Total Earnings: 35$");
    })

    /* Will harvest two corns on tile */
    it("Harvest two corns", async function (){
        let harvest_tile = By.css(".harvest");
        let earnings = By.css(".earnings");

        await driver.wait(until.elementLocated(harvest_tile), 60000)
        await harvestCrop(harvest_tile);
        assert(await driver.findElement(earnings).getText() == "Total Earnings: 135$");
    
        await driver.wait(until.elementLocated(harvest_tile), 60000)
        await harvestCrop(harvest_tile);
        assert(await driver.findElement(earnings).getText() == "Total Earnings: 235$");
    })

    /* Will expand land */
    it("Expand land", async function (){
        let expand_btn = By.css(".expand_btn");
        let earnings = By.css(".earnings");
        let tile_25th = By.css(".tile:nth-child(25)");

        await driver.findElement(expand_btn).click();
        assert(await driver.findElement(earnings).getText() == "Total Earnings: 55$");
        const elements = await driver.findElements(tile_25th);
        assert(elements.length);
    })
})