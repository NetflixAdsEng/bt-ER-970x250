import { Styles, Markup, Align } from "ad-view";
import { ImageManager } from "ad-control";
import { Gesture, GestureEvent } from "ad-events";
import { Animation } from "@common/js/Animation.js";
import "@netflixadseng/wc-netflix-fonts";
import { MonetUtils } from "ad-utils";

export class Control {
  static preMarkup() {
    console.log("Control.preMarkup()");
    /*-- Red.Component.premarkup__content.start --*/
    View.netflixFonts = document.createElement("netflix-fonts");
    Markup.get("main").appendChild(View.netflixFonts);

    /*-- Red.Component.premarkup__content.end --*/
  }

  static postMarkup() {
    console.log("Control.postMarkup()");
    /*-- Red.Component.postmarkup__click.start --*/
    // listen for default exit
    Gesture.add(View.endFrame, GestureEvent.CLICK, Control.handleClick);

    /*-- Red.Component.postmarkup__click.end --*/

    /*-- Red.Component.postmarkup__content.start --*/
    View.endFrame.hide();

    Gesture.add(View.endFrame, GestureEvent.OVER, function() {
      if (adData.onEndframe) {
        View.endFrame.cta.mouseover();
      }
    });
    Gesture.add(View.endFrame, GestureEvent.OUT, function() {
      if (adData.onEndframe) {
        View.endFrame.cta.mouseout();
      }
    });

    /*-- Red.Component.postmarkup__content.end --*/
  }

  /*-- Red.Component.class__content.start --*/

  /*-- Red.Component.class__click.start --*/
  static handleClick(event) {
    /*-- Red.Component.click_content.start --*/
    /*-- Red.Component.click_content.end --*/
    Network.exit(overridePlatformExit, MonetUtils.getDataByKey("Exit_URL"));
  }

  /*-- Red.Component.class__click.end --*/

  static handleMonetLoadComplete(element) {
    console.log("Control.handleMonetLoadComplete()");
    MonetUtils.setData(element)
      .then(data => {
        console.log("	-> All Netflix web components ready");
        // monet data is now assigned to MonetUtils
        /*-- Red.Component.handleMonetLoadComplete_content.start --*/
        adData.hasFTM = MonetUtils.getDataByKey("FTM");
        adData.hasTuneIn = MonetUtils.getDataByKey("Tune_In");

        // Ratings Bug
        adData.hasRatings = MonetUtils.getDataByKey("Ratings_Bug_20x20");

        // if any Dynamic images must be loaded from monet
        // but referenced outside a monet component (CanvasImage, UIImage), follow this pattern
        //
        // adData.ratingsSrc = ImageManager.addToLoad(MonetUtils.getDataByKey('Ratings_Bug_20x20'), { forCanvas: false })
        //

        /*-- Red.Component.handleMonetLoadComplete_extra.start --*/
        /*-- Red.Component.handleMonetLoadComplete_extra.end --*/

        // proceed with ad AFTER the setData() Promise has been fulfilled
        ImageManager.load(function() {
          if (View.intro) View.intro.postMarkupStyling();
          View.endFrame.postMarkupStyling();
          Control.postMarkup();
          Animation.start();
        });

        /*-- Red.Component.handleMonetLoadComplete_content.end --*/
      })
      .catch(err => {
        console.log(err);
        global.failAd();
      });
  }

  static handleIntroVideoComplete(event) {
    /*-- Red.Component.intro_complete.start --*/
    Animation.showEndFrame();
    /*-- Red.Component.intro_complete.end --*/
  }

  static handleIntroClick(event) {
    View.intro.hide();
    Animation.showEndFrame();
    View.intro.introVideoPlayer.pause();
    Control.handleClick();
  }

  /*-- Red.Component.class__content.end --*/
}
