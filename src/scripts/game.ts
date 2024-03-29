import 'phaser'
import BottomBar from './scenes/bottomBar'
import ConnectingScene from './scenes/connectingScene'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import RulesScene from './scenes/rules'
import Register from './scenes/register'
import WebFontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin.js'
import RoundRectanglePlugin from 'phaser3-rex-plugins/plugins/roundrectangle-plugin.js'
import WaitEventsPlugin from 'phaser3-rex-plugins/plugins/waitevents-plugin.js'
import { I18nPlugin } from '@koreez/phaser3-i18n'
import Control from './scenes/contor'
import Header from './scenes/header'
import Bottom from './scenes/bottom'
import Game from './scenes/game'
import Autoplay from './scenes/autoplay'
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin'

const DEFAULT_WIDTH = 1080
const DEFAULT_HEIGHT = 1920

const config = {
  type: Phaser.CANVAS,
  // transparent: true,
  scale: {
    parent: 'phaser-game',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    timeScale: 10,
    fps: {
      target: 30,
      forceSetTimeOut: true
    }
  },
  physics: {
    default: 'matter',
    matter: {
        debug: true,
        gravity: { y: 1 }
    }
  },
  plugins: {
    global: [
      {
        key: 'rexWebFontLoader',
        plugin: WebFontLoaderPlugin,
        start: true
      },
      {
        key: 'rexRoundRectanglePlugin',
        plugin: RoundRectanglePlugin,
        start: true
      },
      {
        key: 'rexWaitEvents',
        plugin: WaitEventsPlugin,
        start: true
      }
    ],
    scene: [
      {
        key: 'i18nPlugin',
        plugin: I18nPlugin,
        mapping: 'i18n'
      },
      {
        plugin: PhaserMatterCollisionPlugin, // The plugin class
        key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
        mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
      },
      
    ]
  },
  scene: [PreloadScene, MainScene, Control, Header, Game, Bottom, BottomBar, ConnectingScene, RulesScene, Register, Autoplay]
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
