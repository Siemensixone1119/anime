export default function scrollTop() {
  const topBtn = document.querySelector("#scrollToTopButton");

  topBtn.addEventListener("click", scroll);

  function scroll(event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}
