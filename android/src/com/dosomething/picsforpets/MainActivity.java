package com.dosomething.picsforpets;

import android.os.Bundle;
import android.app.Activity;
import org.apache.cordova.*;

public class MainActivity extends DroidGap {


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("splashscreen", R.drawable.splash);
        super.loadUrl("file:///android_asset/www/index.html", 2000);
    }
	 @Override
	public void init() {
	    super.init();       
	    this.appView.getSettings().setNavDump(false);
	}

}
