export const menu = () => {
  let btn = document.querySelector(".c-menu-btn--sidebar")
  let spMenu = document.querySelector("#sp-nav")
  if (spMenu != undefined) {
    btn.addEventListener("click", () => {
      spMenu.open = false
    })
  }
}
