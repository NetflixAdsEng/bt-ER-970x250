import { createSideBySidePostMarkups } from "./horizontalSideBySide.js";
import horizontalStacked from "./horizontalStacked.js";
import { Align } from "ad-view";
import { ObjectUtils } from "ad-utils";

const {
  leftPostMarkup,
  offCenterLeftPostMarkup,
  centerPostMarkup,
  offCenterRightPostMarkup,
  rightPostMarkup
} = createSideBySidePostMarkups({
  defaultArgs: {
    ctaLogoOffset: 20,
    tuneInFontSize: 16,
    tuneInLockupOffset: 12
  },
  yAlign: {
    type: Align.BOTTOM,
    offset: -26
  },
  layoutXAligns: {
    leftXAlign: {
      type: Align.LEFT,
      against: 66
    },
    offCenterLeftXAlign: {
      type: Align.LEFT,
      against: 215
    },
    centerXAlign: Align.CENTER,
    offCenterRightXAlign: {
      type: Align.RIGHT,
      offset: -220
    },
    rightXAlign: {
      type: Align.RIGHT,
      offset: -77
    }
  }
});

function stackedPostMarkup() {
  horizontalStacked({
    brandingLockupOffset: 16,
    brandingLockupRightPadding: 35,
    tuneInFontSize: 18
  });
}

export {
  leftPostMarkup,
  offCenterLeftPostMarkup,
  centerPostMarkup,
  offCenterRightPostMarkup,
  rightPostMarkup,
  stackedPostMarkup
};
