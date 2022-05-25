export function listTabs() {
  let tabsArray = [];
  let counter = 0;

  browser.tabs.query({ currentWindow: true }).then((tabs) => {
    for (const tab of tabs) {
      counter++;
      tabsArray.push({
        key: `[${tab.title}][${counter}]`,
        value: `[${counter}]:${tab.url}`,
        id: counter,
      });
    }
    let tabsMarkdown = [];

    // creating the markdown string

    const docTitle = document.getElementById("titleInput").value;
    tabsMarkdown.push(`# ${docTitle}`);
    for (var tabEntry of tabsArray) {
      tabsMarkdown.push(tabEntry.key);
      tabsMarkdown.push("\n");
    }
    tabsMarkdown.push("___");
    for (var tabEntry of tabsArray) {
      tabsMarkdown.push(tabEntry.value);
    }
    let tabsMarkdownComplete = tabsMarkdown.join("\n");

    // creating md file and text blob
    let dlLink = document.createElement("a");
    dlLink.download = `${docTitle}.md`;
    let markdownDoc = new Blob([tabsMarkdownComplete], {
      type: "text/plain",
    });
    dlLink.href = URL.createObjectURL(markdownDoc);
    dlLink.click();
  });
}
window.onload = function () {
  const btn = document.getElementById("exeButton");
  btn.onclick = listTabs;
};
