package com.sampleappmovies;

import android.widget.EditText;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import javax.annotation.Nullable;

public class RTCEditText extends SimpleViewManager<EditText> {

    @Override
    public String getName() {
        return "RTCEditText";
    }

    @Override
    protected EditText createViewInstance(final ThemedReactContext reactContext) {
        return new EditText(reactContext);
    }

    @ReactProp(name = "hint")
    public void setSrc(EditText view, @Nullable String src) {
        view.setHint(src);
    }
}
