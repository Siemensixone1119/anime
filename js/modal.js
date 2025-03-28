const modal = document.querySelector(".search-model");
const modalOpenBtn = document.querySelector(".icon_search");
const modalCloseBtn = modal.querySelector(".search-close-switch");
const search = modal.querySelector("#search-input");

modalOpenBtn.addEventListener("click", onOpenModal);
modalCloseBtn.addEventListener("click", onCloseModal);
search.addEventListener("input", () => {
  console.log(search.value);
});

function onOpenModal() {
  modal.style.display = "block";
}

function onCloseModal() {
  modal.style.display = "none";
}
