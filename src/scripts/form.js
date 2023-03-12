;(function () {
  const btn = document.querySelector(`button[type='submit']`)
  const accept = document.querySelector(`input[name='acceptance']`)
  const form = document.querySelector("form")
  const input = document.querySelectorAll(`input:required,input[type='email'],input[type='tel']`)
  accept.addEventListener("change", () => {
    accept.checked ? btn.removeAttribute("disabled") : btn.setAttribute("disabled", true)
    accept.checked ? btn.removeAttribute("aria-disabled") : btn.setAttribute("aria-disabled", true)
  })

  btn.addEventListener("click", () => {
    if (form.reportValidity()) {
      form.submit()
    }
  })

  input.forEach((elem) => {
    elem.addEventListener("blur", () => {
      isCheck(elem)
    })
  })

  const isCheck = (elem) => {
    const messageBox = elem.parentElement.querySelector(".c-error-message")
    if (elem.type === "tel") {
      const regex = /\d{2,4}-?\d{2,4}-?\d{3,4}/
      const telCheck = regex.test(elem.value)
      if (!telCheck && elem.value !== "") {
        if (!messageBox) {
          insertMessage(elem, "電話番号の形式が正しくありません。")
        }
      } else {
        if (messageBox) {
          elem.parentNode.removeChild(messageBox)
        }
      }
    } else if (elem.type === "text" && elem.hasAttribute("required")) {
      const elemValue = elem.value.trim()
      if (elemValue.length === 0) {
        if (!messageBox) {
          insertMessage(elem, "必須項目です。")
        }
      } else {
        if (messageBox) {
          elem.parentNode.removeChild(messageBox)
        }
      }
    } else if (elem.type === "email" && elem.hasAttribute("required")) {
      const elemValue = elem.value.trim()
      const regex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
      const mailCheck = regex.test(elem.value)
      if (!mailCheck) {
        if (elemValue.length === 0) {
          if (!messageBox) {
            insertMessage(elem, "必須項目です。")
          } else {
            messageBox.innerHTML = "必須項目です。"
          }
        } else if (elem.value !== "") {
          if (!messageBox) {
            insertMessage(elem, "メールアドレスの形式が正しくありません。")
          } else {
            messageBox.innerHTML = "メールアドレスの形式が正しくありません。"
          }
        }
      } else {
        if (messageBox) {
          elem.parentNode.removeChild(messageBox)
        }
      }
    }
  }

  const insertMessage = (elem, message) => {
    let errorMessage = message
    const messageBox = document.createElement("div")
    messageBox.classList.add("c-error-message")
    messageBox.setAttribute("aria-live", "polite")
    messageBox.textContent = errorMessage
    elem.parentNode.appendChild(messageBox)
  }
})()
