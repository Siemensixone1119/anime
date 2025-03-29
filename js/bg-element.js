export default function bg_element() {
  const elements = document.querySelectorAll(".set-bg");

  for (let i = 0; i < elements.length; i += 1) {
    const src = elements[i].dataset.setbg;
    elements[i].style.backgroundImage = `url(${src})`;
  }
}
