import * as React from "react";
import { View } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

import { renderItem } from "@/utils/render-item";
import { useAdvancedSettings } from "@/hooks/useSettings";
import { CarouselAdvancedSettingsPanel } from "@/components/CarouselAdvancedSettingsPanel";
import { CustomSelectActionItem } from "@/components/ActionItems";
import { CaptureWrapper } from "@/store/CaptureProvider";
import { defaultDataWith6Colors } from "@/components/CarouselBasicSettingsPanel";

function Index() {
  const viewCount = 5;
  const [mode, setMode] = React.useState<any>("horizontal-stack");
  const [snapDirection, setSnapDirection] = React.useState<"left" | "right">(
    "left",
  );
  const ref = React.useRef<ICarouselInstance>(null);
  const { advancedSettings, onAdvancedSettingsChange } = useAdvancedSettings({
    // These values will be passed in the Carousel Component as default props
    defaultSettings: {
      autoPlay: false,
      autoPlayInterval: 2000,
      autoPlayReverse: false,
      data: defaultDataWith6Colors,
      height: 258,
      loop: true,
      pagingEnabled: true,
      snapEnabled: true,
      vertical: false,
      width: 430,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <CaptureWrapper>
        <Carousel
          ref={ref}
          {...advancedSettings}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: 240,
          }}
          width={280}
          height={210}
          mode={mode}
          modeConfig={{
            snapDirection,
            stackInterval: mode === "vertical-stack" ? 8 : 18,
          }}
          customConfig={() => ({ type: "positive", viewCount })}
          renderItem={renderItem({ rounded: true })}
        />
      </CaptureWrapper>

      <CarouselAdvancedSettingsPanel
        carouselRef={ref}
        advancedSettings={advancedSettings}
        onAdvancedSettingsChange={onAdvancedSettingsChange}
        extraSettings={[
          <CustomSelectActionItem
            label="Change mode"
            value={mode}
            onValueChange={(value) => {
              setMode(value);
            }}
            options={[
              { label: "Horizontal Stack", value: "horizontal-stack" },
              { label: "Vertical Stack", value: "vertical-stack" },
            ]}
          />,
          <CustomSelectActionItem
            label="Change snap direction"
            value={snapDirection}
            onValueChange={(value) => {
              setSnapDirection(value as "left" | "right");
            }}
            options={[
              { label: "Left", value: "left" },
              { label: "Right", value: "right" },
            ]}
          />,
        ]}
      />
    </View>
  );
}

export default Index;
