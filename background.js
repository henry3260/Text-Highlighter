chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "highlightAndSave",
      title: "Highlight and Save",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "highlightAndSave") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (selectedText) => {
          const span = document.createElement("span");
          span.style.backgroundColor = "yellow";
          span.textContent = selectedText;
          const range = window.getSelection().getRangeAt(0);
          range.deleteContents();
          range.insertNode(span);
        },
        args: [info.selectionText]
      });
    }
  });
  