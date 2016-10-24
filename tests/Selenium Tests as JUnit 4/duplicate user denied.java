package com.example.tests;

import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.junit.*;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

public class DupplicateUserDenied {
  private WebDriver driver;
  private String baseUrl;
  private boolean acceptNextAlert = true;
  private StringBuffer verificationErrors = new StringBuffer();

  @Before
  public void setUp() throws Exception {
    driver = new FirefoxDriver();
    baseUrl = "https://onthespot-production.herokuapp.com/login";
    driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
  }

  @Test
  public void testDupplicateUserDenied() throws Exception {
    // ERROR: Caught exception [ERROR: Unsupported command [selectWindow | null | ]]
    driver.get(baseUrl + "/login");
    driver.findElement(By.linkText("Create One")).click();
    driver.findElement(By.id("firstName")).clear();
    driver.findElement(By.id("firstName")).sendKeys("Captain");
    driver.findElement(By.id("lastName")).clear();
    driver.findElement(By.id("lastName")).sendKeys("Dummy");
    driver.findElement(By.id("email")).clear();
    driver.findElement(By.id("email")).sendKeys("testing@dummy.com");
    driver.findElement(By.id("password")).clear();
    driver.findElement(By.id("password")).sendKeys("password");
    driver.findElement(By.id("streetNumber")).clear();
    driver.findElement(By.id("streetNumber")).sendKeys("1");
    driver.findElement(By.id("streetName")).clear();
    driver.findElement(By.id("streetName")).sendKeys("Test Street");
    driver.findElement(By.id("suburb")).clear();
    driver.findElement(By.id("suburb")).sendKeys("Test Suburb");
    driver.findElement(By.id("postCode")).clear();
    driver.findElement(By.id("postCode")).sendKeys("1234");
    driver.findElement(By.xpath("//button[@type='submit']")).click();
    try {
      assertEquals("There's already an account registered with that email address", driver.findElement(By.cssSelector("div.toast-message")).getText());
    } catch (Error e) {
      verificationErrors.append(e.toString());
    }
  }

  @After
  public void tearDown() throws Exception {
    driver.quit();
    String verificationErrorString = verificationErrors.toString();
    if (!"".equals(verificationErrorString)) {
      fail(verificationErrorString);
    }
  }

  private boolean isElementPresent(By by) {
    try {
      driver.findElement(by);
      return true;
    } catch (NoSuchElementException e) {
      return false;
    }
  }

  private boolean isAlertPresent() {
    try {
      driver.switchTo().alert();
      return true;
    } catch (NoAlertPresentException e) {
      return false;
    }
  }

  private String closeAlertAndGetItsText() {
    try {
      Alert alert = driver.switchTo().alert();
      String alertText = alert.getText();
      if (acceptNextAlert) {
        alert.accept();
      } else {
        alert.dismiss();
      }
      return alertText;
    } finally {
      acceptNextAlert = true;
    }
  }
}
