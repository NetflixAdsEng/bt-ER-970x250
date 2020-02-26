import { Styles, Markup, Align, Effects } from 'ad-view'
import { ImageManager } from 'ad-control'
import { Animation } from '@common/js/Animation.js'
import { Control } from '@common/js/Control.js'
import CanvasIris from '@common/js/CanvasIris.js'
import { UIComponent, UIBorder, UIButton, UIImage, TextFormat, UITextField, UISvg } from 'ad-ui'
import { ObjectUtils } from 'ad-utils'
import baseInit from './baseInit.js'

export { mainInit, stackedInit }

function mainInit(T) {
	baseInit(T, { logoWidth: 111, ctaWidth: 111, ctaMaxWidth: 130, ctaHeight: 28 })
}

function stackedInit(T) {
	baseInit(T, {
		logoWidth: 121,
		ctaWidth: 121,
		ctaMaxWidth: 121,
		ctaHeight: 32
	})
}
