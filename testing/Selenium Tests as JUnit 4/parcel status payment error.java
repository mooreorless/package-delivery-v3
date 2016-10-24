package com.example.tests;

import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.junit.*;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

public class ParcelStatusPaymentError {
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
  public void testParcelStatusPaymentError() throws Exception {
    driver.get(baseUrl + "/login");
    driver.findElement(By.id("email")).sendKeys("jono@onthespot.com");
    driver.findElement(By.id("password")).sendKeys("driver");
    driver.findElement(By.xpath("//button[@type='submit']")).click();
    try {
      assertEquals("Success", driver.findElement(By.cssSelector("div.toast-title")).getText());
    } catch (Error e) {
      verificationErrors.append(e.toString());
    }
    driver.findElement(By.linkText("dvrMY JOBS")).click();
    driver.findElement(By.xpath("//body[@id='bootstrap-overrides']/div/div/div/div[3]/div[3]/div/div/h3/span")).click();
    new Select(driver.findElement(By.xpath("//div[@id='add-margin']/div/div/div/select"))).selectByVisibleText("Picked Up");
    driver.findElement(By.id("cardNumber")).clear();
    driver.findElement(By.id("cardNumber")).sendKeys("1234-5678-9101-1121");
    driver.findElement(By.cssSelector("div.col-xs-4 > p > #cardNumber")).clear();
    driver.findElement(By.cssSelector("div.col-xs-4 > p > #cardNumber")).sendKeys("422");
    driver.findElement(By.id("cardExp")).clear();
    driver.findElement(By.id("cardExp")).sendKeys("22/18");
    driver.findElement(By.xpath("//div[@id='add-margin']/div[2]/div[3]/div[2]/div[2]/div[2]/button")).click();
    try {
      assertEquals("Invalid Payment Details", driver.findElement(By.cssSelector("div.toast.toast-error > div > div.toast-message")).getText());
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
