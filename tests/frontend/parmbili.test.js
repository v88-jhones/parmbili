const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const { Builder, By, Key, until } = require("selenium-webdriver");

const screen = { width: 1080, height: 720 };
let chrome_options = new chrome.Options().windowSize(screen);
chrome_options.addArguments("--proxy-server='direct://'");
chrome_options.addArguments("--proxy-bypass-list=*");
// chrome_options.addArguments("--headless"); 
// chrome_options.addArguments("--disable-gpu");
// chrome_options.addArguments("--blink-settings=imagesEnabled=false"); 


describe('till', function() {
    this.timeout(30000)
    let driver
    let vars

    before(async function(){
        driver = await new Builder()
                .forBrowser("chrome")
                .setChromeOptions(chrome_options)
                .build(); 
        await driver.get("http://localhost:3000/");
    });

    beforeEach(async function() {
        await driver.sleep(1000);
        vars = {}
    });

    after(async function() {
        await driver.quit();
    });

    it('till', async function() {
        await driver.manage().window().setRect({ width: 1552, height: 832 })
        await driver.findElement(By.css(".parmbili_parmbili_container__HVb4K")).click()
        await driver.findElement(By.css(".tile_tile__fNwBW:nth-child(1)")).click()
        await driver.findElement(By.css(".tile_popover_btn__s2hzl")).click()
        await driver.findElement(By.css(".tile_popover_btn__s2hzl")).click()
        await driver.findElement(By.css(".plant_plant__mywZ\\+:nth-child(1) > img")).click()
        await driver.findElement(By.css(".btn:nth-child(2)")).click()
    })

    // it('plant', async function() {
    //     await driver.manage().window().setRect({ width: 780, height: 664 })
    //     await driver.findElement(By.css(".parmbili_parmbili_container__HVb4K")).click()
    //     await driver.findElement(By.css(".tile_tile__fNwBW:nth-child(1)")).click()
    //     await driver.findElement(By.css(".tile_popover_btn__s2hzl")).click()
    //     await driver.findElement(By.css(".tile_popover_btn__s2hzl")).click()
    //     await driver.findElement(By.css(".plant_plant__mywZ\\+:nth-child(1) > img")).click()
    //     await driver.findElement(By.css(".btn:nth-child(2)")).click()
    // });

    // it('cancel plant', async function() {   

    // });

    // it('remove plant', async function() {

    // });

    // it('harvest plant', async function() {

    // });
})