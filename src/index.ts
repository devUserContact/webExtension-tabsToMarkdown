export function generateMardownDocument() {
  let tabsArray: { key: string; value: string; id: number }[] = []
  let counter = 0

  function createCurrentDate() {
    let dateElement: number[] = []
    dateElement.push(new Date().getMonth() + 1)
    dateElement.push(new Date().getDate())
    function zeroPadding(dateNumber: number) {
      if (dateNumber < 10) {
        return dateNumber.toString().padStart(2, '0')
      } else {
        return dateNumber.toString()
      }
    }
    const newDateElement = dateElement.map(zeroPadding)
    let currentDate = `${newDateElement[0]}-${newDateElement[1]}-${new Date().getFullYear()}`
    return currentDate
  }

  chrome.tabs.query({ currentWindow: true }).then((tabs: any) => {
    for (const tab of tabs) {
      counter++
      tabsArray.push({
        key: `[${tab.title}][${counter}]`,
        value: `[${counter}]:${tab.url}`,
        id: counter,
      })
    }
    let tabsMarkdown: string[] = []
    let docTitle = (<HTMLInputElement>document.getElementById('titleInput')).value
    let date = createCurrentDate()
    if (docTitle === '') {
      docTitle = `tabsToMarkdown_${date}`
    }
    tabsMarkdown.push(`# ${docTitle}`)
    for (const tabEntry of tabsArray) {
      if (tabEntry.id === tabsArray.length) {
        tabsMarkdown.push(`${tabEntry.key}`)
      } else {
        tabsMarkdown.push(`${tabEntry.key}\n`)
      }
    }
    tabsMarkdown.push('___')
    for (const tabEntry of tabsArray) {
      tabsMarkdown.push(tabEntry.value)
    }
    let tabsMarkdownComplete = tabsMarkdown.join('\n')
    let dlLink = document.createElement('a')
    dlLink.download = `${docTitle}.md`
    let markdownDoc = new Blob([tabsMarkdownComplete], {
      type: 'text/plain',
    })
    dlLink.href = URL.createObjectURL(markdownDoc)
    dlLink.click()
  })
}

window.onload = function () {
  const btn = document.getElementById('exeButton')
  btn.onclick = generateMardownDocument
}

