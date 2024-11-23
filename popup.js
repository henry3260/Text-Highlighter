document.addEventListener("DOMContentLoaded", () => {
    const highlightList = document.getElementById("highlightList");
  
    chrome.storage.local.get("highlights", (data) => {
      const highlights = data.highlights || [];
      highlights.forEach((text, index) => {
        const li = document.createElement("li");
        li.textContent = text;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => {
          highlights.splice(index, 1);
          chrome.storage.local.set({ highlights }, () => location.reload());
        };
        li.appendChild(deleteBtn);
        highlightList.appendChild(li);
      });
    });
  });
  