;(function () {
  const mymap = document.querySelector("#myMap")
  const io = new IntersectionObserver(inViewport, {
    threshold: [0],
  })
  function inViewport(entries, io) {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        const element = entry.target
        element.src = element.getAttribute("data-src")
        element.addEventListener("load", () => {
          element.removeAttribute("data-src")
        })
        io.unobserve(entry.target)
      }
    })
  }
  io.observe(mymap)
})()
