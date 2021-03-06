package com.sampleappmovies;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class AndroidPackageImp implements ReactPackage {


    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        final ArrayList<NativeModule> nativeModules = new ArrayList<>();
        nativeModules.add(new ToastAndroid(reactContext));
        return nativeModules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        final ArrayList<ViewManager> nativeModules = new ArrayList<>();
        nativeModules.add(new RTCEditText());
        return nativeModules;
    }
}
