import { Styles, Markup, Align, Effects } from 'ad-view'
import { ImageManager } from 'ad-control'
import { Animation } from '@common/js/Animation.js'
import { Control } from '@common/js/Control.js'
import { UIComponent, UIBorder, UIButton, UIImage, TextFormat, UITextField, UISvg, UIGroup } from 'ad-ui'
import { ObjectUtils } from 'ad-utils'

export default function() {
	let T = View.endFrame

	// title treatment
	Align.set(T.tt, {
		x: Align.CENTER,
		y: Align.CENTER
	})

	Align.set(T.pedigree, {
		x: {
			type: Align.CENTER,
			against: T.tt
		},
		y: {
			type: Align.CENTER,
			against: 55
		}
	})

	// logo
	var logoX = 650
	var logoCtaY = 195
	Align.set(T.netflixLogo, {
		x: {
			type: Align.LEFT,
			offset: logoX
		},
		y: {
			type: Align.TOP,
			offset: logoCtaY
		}
	})

	// cta
	var ctaX = 780
	T.cta.resize()
	Align.set(T.cta, {
		x: {
			type: Align.LEFT,
			offset: ctaX
		},
		y: {
			type: Align.TOP,
			offset: logoCtaY
		}
	})

	const ctaLogoLockup = new UIGroup({
		target: T,
		children: [T.cta, T.netflixLogo]
	})

	if (adData.hasFTM) {
		// free trial messaging
		Styles.setCss(T.ftm, {
			color: '#fff',
			fontSize: 14,
			letterSpacing: 1,
			textAlign: 'center'
		})
		Align.set(T.ftm, {
			x: { type: Align.CENTER, against: ctaLogoLockup },
			y: {
				type: Align.TOP,
				against: ctaLogoLockup,
				outer: true,
				offset: -18
			}
		})
		T.removeChild(T.tuneIn)
	} else {
		// tune-in
		Styles.setCss(T.tuneIn, {
			color: '#fff',
			fontSize: 16,
			letterSpacing: 1,
			textAlign: 'center'
		})
		Align.set(T.tuneIn, {
			x: { type: Align.CENTER, against: ctaLogoLockup },
			y: {
				type: Align.TOP,
				against: ctaLogoLockup,
				outer: true,
				offset: -18
			}
		})
		T.removeChild(T.ftm)
	}

	// ratings bug
	if (adData.hasRatings) {
		Align.set(T.ratingsBug, {
			x: {
				type: Align.RIGHT,
				offset: -5
			},
			y: {
				type: Align.BOTTOM,
				offset: -5
			}
		})
	} else {
		T.removeChild(T.ratingsBug)
	}
}
