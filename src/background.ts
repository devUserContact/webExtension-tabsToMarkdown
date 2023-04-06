import { generateMardownDocument } from './index';

browser.commands.onCommand.addListener((command: string) => {
  if (command === 'convert-tabs-to-markdown') {
    generateMardownDocument();
  }
});

