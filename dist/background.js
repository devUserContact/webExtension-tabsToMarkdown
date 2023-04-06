import { generateMardownDocument } from './index';
browser.commands.onCommand.addListener((command) => {
    if (command === 'convert-tabs-to-markdown') {
        generateMardownDocument();
    }
});
