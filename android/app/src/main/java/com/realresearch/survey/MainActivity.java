package com.realresearch.survey;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle; // Addition for Splash screen
import org.devio.rn.splashscreen.SplashScreen; // Addition for Splash screen

public class MainActivity extends ReactActivity {

  /*
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    this.sendBroadcast(intent);
  } // addition for react native orientation

  @Override
  protected String getMainComponentName() {
    return "survey";
  }

  @Override // Addition for Splash screen
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  
        super.onCreate(savedInstanceState);
    }
}
