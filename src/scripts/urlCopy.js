;(function () {
  let shareBtn = document.querySelector("#shareBtn")
  let shareURL = document.querySelector("#shareURL")
  async function copyToClip() {
    shareURL.select()
    let text = shareURL.value
    let messageBox = document.createElement("dialog")
    messageBox.classList.add("c-copy-message")
    try {
      await navigator.clipboard.writeText(text)
      messageBox.innerHTML = "クリップボードにコピー"
      shareURL.parentNode.appendChild(messageBox)
      setTimeout(() => {
        let dialogBox = document.querySelector(".c-copy-message")
        dialogBox.remove()
        shareBtn.disabled = false
      }, 4000)
    } catch (error) {
      messageBox.innerHTML = "コピーに失敗しました"
      shareURL.parentNode.appendChild(messageBox)
      setTimeout(() => {
        let dialogBox_1 = document.querySelector(".c-copy-message")
        dialogBox_1.remove()
        shareBtn.disabled = false
      }, 4000)
    }
  }
  if (shareBtn != null) {
    shareBtn.addEventListener("click", () => {
      shareBtn.disabled = true
      copyToClip()
    })
  }
})()
