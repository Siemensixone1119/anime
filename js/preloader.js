export default function preloader() {
  const preloder = document.querySelector(".preloder");
  preloder.classList.add("active");
  setTimeout(() => {
    preloder.classList.remove("active");
  }, 1500);
}
