package com.realresearch.survey;

import com.facebook.react.ReactActivity;
import com.lockincomp.liappagent.LiappAgent;

import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle; // Addition for Splash screen
import android.widget.Toast;

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

    //call LA1
    boolean bIsStarted = false;
    int nRet;


    if (bIsStarted == false) {
      nRet = LiappAgent.LA1();
    } else {
      nRet = LiappAgent.LA2();
    }
    if (LiappAgent.LIAPP_SUCCESS == nRet) {
      bIsStarted = true;
      // you don’t create to ‘user_key_from_server’.
      // ‘user_key_from_server’ is from the app server.

//      String user_key = user_key_from_server;
//
//      String authtoken = LiappAgent.GA(user_key);

      // send ‘authtoken’ to app server for token verification.
    } else if (LiappAgent.LIAPP_EXCEPTION == nRet) {
      // Exception. Bypass or Network Connected Error.
      Toast.makeText(this, LiappAgent.GetMessage(), Toast.LENGTH_LONG).show();
    } else {
      if (LiappAgent.LIAPP_DETECTED == nRet) {
      //DETECTED USER BLOCK or ANTI DEBUGGING or ANTI TAMPER Toast.makeText(this, LiappAgent.GetMessage(), Toast.LENGTH_LONG).show();
      } else if (LiappAgent.LIAPP_DETECTED_ROOTING == nRet) { // Rooting Detection!
        Toast.makeText(this, LiappAgent.GetMessage(), Toast.LENGTH_LONG).show();
      } else if (LiappAgent.LIAPP_DETECTED_VM == nRet) {
        // Virtual Machine Detection!
        Toast.makeText(this, LiappAgent.GetMessage(), Toast.LENGTH_LONG).show();
      } else if (LiappAgent.LIAPP_DETECTED_HACKING_TOOL == nRet) {
        // Hacking Tool Detection!
        Toast.makeText(this, LiappAgent.GetMessage(), Toast.LENGTH_LONG).show(); } else {
        //unknown Error
      }
      System.exit(0);
    }

        super.onCreate(savedInstanceState);
    }
}
