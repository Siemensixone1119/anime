import bgElement from "./bg-element.js";

export default function mainData() {
  const renderAnimeList = (arr, ganres) => {
    console.log(arr);
    console.log(ganres);
    
  };

  const renderTopAnime = (arr) => {
    const wrapper = document.querySelector(".filter__gallery");
    console.log(arr);
    wrapper.innerHTML = "";
    arr.forEach((item) => {
      wrapper.insertAdjacentHTML(
        "afterbegin",
        `<div class="product__sidebar__view__item set-bg" data-setbg="${item.image}">
          <div class="ep">${item.rating} / 10</div>
          <div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
          <h5><a href="/anime-details.html">${item.title}</a></h5>
        </div>`
      );
    });
    bgElement();
  };

  fetch(
    "https://anime-be8cd-default-rtdb.europe-west1.firebasedatabase.app/anime.json"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const ganres = new Set();
      renderTopAnime(
        data
          .sort((a, b) => a.views - b.views)
          .reverse()
          .slice(0, 5)
      );

      data.forEach((item) => {
        ganres.add(item.ganre);
      });

      renderAnimeList(data, ganres);
    });
}
