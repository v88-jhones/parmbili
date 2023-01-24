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

/** 
*   DOCU: Will unit test the parmbili activity. <br>
*   Command to run the test: NODE_ENV=development ./node_modules/.bin/mocha tests/frontend/*.test.js
*   Last updated at: January 24, 2023
*   @author Jhones
*/
describe("Parmbili Unit Test", function(){
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

    after(async function(){
        await driver.quit();
    });

    /** 
    *   DOCU: Will wait for selected element to exists and assert it. <br>
    *   Last updated at: January 24, 2023
    *   @param {object} element the element to assert
    *   @author Jhones
    */
    const assertElementExist = async (element, delay = 500) => {
        await driver.wait(until.elementLocated(element), DEFAULT.wait_time);
        const search_input_field = await driver.findElements(element);
        assert(search_input_field.length);
        await driver.wait(until.elementIsVisible(await driver.findElement(element)), DEFAULT.wait_time);
        await driver.sleep(delay);
    }

    /** 
    *   DOCU: Will assert if the element is not exists. <br>
    *   Last updated at: January 24, 2023
    *   @param {object} element the element to assert 
    *   @param {object} delay optional, default is 500. The delay before checking.
    *   @author Jhones
    */
    const assertElementNotExist = async (element, delay = 500) => {
        await driver.sleep(delay);
        const elements = await driver.findElements(element);
        assert(!elements.length);
    }

    /** 
    *   DOCU: This will plant a crop in a specified tile. <br>
    *   Last updated at: January 24, 2023
    *   @param {object} tile the tile element where the crop will be planted
    *   @param {string} targetPlant the css selector of the crop to be plant.
    *   @param {boolean} isTilled the status of the tile.
    *   @author Jhones
    */
    const plantCrop = async (tile, targetPlant, isTilled = true) => {
        let popover_plant = By.css(".popover .popover_btn");
        let modal_plant = By.css(".modals_plants .plant");

        await driver.findElement(tile).click();
        await assertElementExist(popover_plant);
        await driver.findElement(popover_plant).click();

        if(!isTilled){
            await driver.findElement(popover_plant).click();
        }

        await assertElementExist(modal_plant);
        await driver.findElement(By.css(targetPlant)).click();
        await assertElementExist(By.css(".plant.active"));
        await driver.findElement(By.css(".btn:nth-child(2)")).click();
        await assertElementExist(By.css(".tile.has_plant"));
    }

    /** 
    *   DOCU: This will harvest plant in a specified tile. <br>
    *   Last updated at: January 24, 2023
    *   @param {object} tile the tile element to be harvest.
    *   @author Jhones
    */
    const harvestCrop = async (tile) => {
        let harvest_btn = By.css(".popover_btn:nth-child(1)");
        await driver.wait(until.elementLocated(tile), DEFAULT.harvest_wait_time);
        await driver.findElement(tile).click();
        await assertElementExist(By.css(".popover .popover_btn"));
        await driver.findElement(harvest_btn).click();
        await assertElementExist(harvest_btn);
        await driver.sleep(500);
    }
        
    /** 
    *   DOCU: Will till the tile. <br>
    *   Last updated at: January 24, 2023
    *   @author Jhones
    */
    it("Can click the tile and show popover to till the tile.", async () => {
        await driver.findElement(By.css(".tile:nth-child(1)")).click();
        await assertElementExist(By.css(".popover .popover_btn"));
        await driver.findElement(By.css(".popover_btn")).click();
        await assertElementExist(By.css(".tile.tilled"));
    })

    /** 
    *   DOCU: Will plant on tilled tile. <br>
    *   Last updated at: January 24, 2023
    *   @author Jhones
    */
    it("Can plant on tilled tile.", async function(){
        await driver.findElement(By.css(".popover_btn")).click();
        await assertElementExist(By.css(".modals_plants"));
    })

    /** 
    *   DOCU: Will cancel plant action and close the modal. <br>
    *   Last updated at: January 24, 2023
    *   @author Jhones
    */
    it("Can cancel the plant action by clicking the cancel button on plant modal.", async function(){
        await driver.findElement(By.css(".btn-secondary")).click();
        await assertElementNotExist(By.css(".modals_plants"));
    })

    /** 
    *   DOCU: Will plant a selected crop on tilled tile. <br>
    *   Last updated at: January 24, 2023
    *   @author Jhones
    */
    it("Can plant a selected crop from plant modal.", async function(){
        await plantCrop(By.css(".tilled"), DEFAULT.plants.potato);
        const elements = await driver.findElements(By.css(".has_plant"));
        assert(elements.length);
        assert(await driver.findElement(By.css(".earnings")).getText() == "Total Earnings: 40$");
    })

    /** 
    *   DOCU: Will click the on-progress plant and show the remove popover. <br>
    *   Last updated at: January 24, 2023
    *   @author Jhones
    */
    it("Can show the remove popover when clicked on planted till.", async function(){
        let popover_remove_btn = By.css(".popover .btn-secondary");

        await driver.findElement(By.css(".has_plant")).click();
        await driver.wait(until.elementLocated(popover_remove_btn), DEFAULT.wait_time);
        await assertElementExist(popover_remove_btn);
        await driver.findElement(popover_remove_btn).click();
        await assertElementExist(By.css(".modals .remove"));
    })

    /** 
    *   DOCU: Will cancel the remove popover. <br>
    *   Last updated at: January 24, 2023
    *   @author Jhones
    */
    it("Can cancel the remove action when cancel button is clicked on remove modal", async function(){
        await driver.findElement(By.css(".btn-danger")).click();
        await assertElementNotExist(By.css(".modals .remove"));
    })

    /** 
    *   DOCU: Will remove the crop/plant in tile. <br>
    *   Last updated at: January 24, 2023
    *   @author Jhones
    */
    it("Can remove the plant on tile if remove button is clicked on remove modal.", async function(){
        let has_plant = By.css(".tile.has_plant");
        let popver_remove_btn = By.css(".popover > .btn-secondary");
        let modal_remove_btn = By.css(".modals_action > .btn-secondary");

        await driver.findElement(has_plant).click();
        await assertElementExist(popver_remove_btn);
        await driver.findElement(popver_remove_btn).click();
        await assertElementExist(modal_remove_btn);
        await driver.findElement(modal_remove_btn).click();
        await assertElementNotExist(has_plant);
    })

    /** 
    *   DOCU: Will plant corn on tile. <br>
    *   Last updated at: January 24, 2023
    *   @author Jhones
    */
    it("Can plant corn on first tile.", async function(){
        await plantCrop(By.css(".tile:nth-child(1)"), DEFAULT.plants.corn, false);
        assert(await driver.findElement(By.css(".earnings")).getText() == "Total Earnings: 5$");
    })

    /** 
    *   DOCU: Will harvest corn on tile. <br>
    *   Last updated at: January 24, 2023
    *   @author Jhones
    */
    it("Can harvest corn and earn money.", async function(){
        await harvestCrop(By.css(".tile.harvest"));
        assert(await driver.findElement(By.css(".earnings")).getText() == "Total Earnings: 105$");
    })

    /** 
    *   DOCU: Will plant two corns on tile. <br>
    *   Last updated at: January 24, 2023
    *   @author Jhones
    */
    it("Can plant two corns on selected tiles.", async function(){
        let earnings = By.css(".earnings");
        
        await plantCrop(By.css(".tile:nth-child(1)"), DEFAULT.plants.corn, false);
        assert(await driver.findElement(earnings).getText() == "Total Earnings: 70$");
        await driver.sleep(500);
        await plantCrop(By.css(".tile:nth-child(2)"), DEFAULT.plants.corn, false);
        assert(await driver.findElement(earnings).getText() == "Total Earnings: 35$");
    })

    /** 
    *   DOCU: Will harvest two corns on tile. <br>
    *   Last updated at: January 24, 2023
    *   @author Jhones
    */
    it("Can harvest two corns and earn money.", async function(){
        let harvest_tile = By.css(".harvest");
        let earnings = By.css(".earnings");

        await harvestCrop(harvest_tile);
        assert(await driver.findElement(earnings).getText() == "Total Earnings: 135$");
    
        await harvestCrop(harvest_tile);
        assert(await driver.findElement(earnings).getText() == "Total Earnings: 235$");
    })

    /** 
    *   DOCU: Will expand land. <br>
    *   Last updated at: January 24, 2023
    *   @author Jhones
    */
    it("Can expand land and subtract the cost in current money.", async function(){
        await driver.findElement(By.css(".expand_btn")).click();
        assert(await driver.findElement(By.css(".earnings")).getText() == "Total Earnings: 55$");
        const elements = await driver.findElements(By.css(".tile:nth-child(25)"));
        assert(elements.length);
    })
})