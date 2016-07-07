package com.sampleappmovies;

import android.os.CountDownTimer;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

public class ToastAndroid extends ReactContextBaseJavaModule {
    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";
    private Toast toast;

    public ToastAndroid(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ToastAndroid";
    }

    @Override
    public boolean canOverrideExistingModule() {
        return true;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void show(String message, int duration) {
        toast = Toast.makeText(getReactApplicationContext(), message, duration);
        toast.show();
    }

    @ReactMethod
    public void measureLayout(Callback errorCallback,
                              Callback successCallback) {
        try {
            if (toast != null) {
                successCallback.invoke(toast.getXOffset(), toast.getYOffset(), toast.getView().getWidth(), toast.getView().getHeight());
            }
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void triggerDelayedEvent() {
        final CountDownTimer countDownTimer = new CountDownTimer(5000, 500) {
            @Override
            public void onTick(long millisUntilFinished) {
                if (toast != null) {
                    toast.cancel();
                }
                toast = Toast.makeText(getReactApplicationContext(), "" + millisUntilFinished / 1000, Toast.LENGTH_SHORT);
                toast.show();
            }

            @Override
            public void onFinish() {
                sendEvent(getReactApplicationContext(), "DelayedEvent", null);
            }
        };
        countDownTimer.start();

    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }


}
