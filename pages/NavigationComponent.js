class NavigationComponent {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // TODO: Define locators for Navigation menu & header links
    this.logoutlink=page.locator("//a[@href='logout.htm']") 
  }
  async goto(){
    await this.page.goto(process.env.BASE_URL+"/overview.htm")
  }
  
  async logout() {
    await this.logoutlink.click();
  }
}

module.exports = { NavigationComponent };
