import { listTabs } from './index.js'

browser.commands.onCommand.addListener(function (command) {
  if (command === 'convert-tabs-to-markdown') {
    listTabs()
  }
})
