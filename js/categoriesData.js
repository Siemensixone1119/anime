import bgElement from "./bg-element.js";

const categoriesData = () => {
  const renderGanreList = (ganres) => {
    const dropDownBlock = document.querySelector(".header__menu .dropdown");

    ganres.forEach((ganre) => {
      dropDownBlock.insertAdjacentHTML(
        "afterbegin",
        `
         <li>
          <a href="./categories.html?ganre=${ganre}">${ganre}</a>
        </li>
        `
      );
    });
  };

  const renderAnimeList = (arr, ganres) => {
    const wrapper = document.querySelector(".product-page .col-lg-8");

    ganres.forEach((ganre) => {
      const productBlock = document.createElement("div");
      const listBlock = document.createElement("div");
      const list = arr.filter((item) => item.tags.includes(ganre));

      listBlock.classList.add("row");
      productBlock.classList.add("mb-5");

      productBlock.append(listBlock);
      wrapper.append(productBlock);

      productBlock.insertAdjacentHTML(
        "afterbegin",
        `
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-8">
            <div class="section-title">
              <h4>${ganre}</h4>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4">
            <div class="btn__all">
              <a href="./categories.html?ganre=${ganre}" class="primary-btn">View All <span class="arrow_right"></span></a>
            </div>
          </div>
        </div>`
      );

      list.forEach((item) => {
        const tagsBlock = document.createElement("ul");

        item.tags.forEach((tag) => {
          tagsBlock.insertAdjacentHTML(
            "afterbegin",
            `
            <li>${tag}</li>
            `
          );
        });

        listBlock.insertAdjacentHTML(
          "afterbegin",
          `
          <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="product__item">
              <div class="product__item__pic set-bg" data-setbg="${item.image}">
                <div class="ep">${item.rating} / 18</div>
                <div class="view"><i class="fa fa-eye"></i>${item.views}</div>
              </div>
              <div class="product__item__text">
                ${tagsBlock.outerHTML}
                <h5><a href="./anime-details.html?itemId=${item.id}">${item.title}</a></h5>
              </div>
            </div>
          </div>`
        );
      });
      bgElement();
    });
  };

  const renderTopAnime = (arr) => {
    const wrapper = document.querySelector(".filter__gallery");
    console.log(arr);
    arr.forEach((item) => {
      wrapper.insertAdjacentHTML(
        "beforeend",
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
    .then((response) => response.json())
    .then((data) => {
      const ganres = new Set();
      const ganreParams = new URLSearchParams(window.location.search).get(
        "ganre"
      );
      console.log(ganreParams);

      data.forEach((item) => {
        ganres.add(item.ganre);
      });

      renderTopAnime(
        data
          .sort((a, b) => a.views - b.views)
          .reverse()
          .slice(0, 5)
      );
      if (ganreParams) {
        renderAnimeList(data.reverse(), [ganreParams]);
      } else {
        renderAnimeList(data.reverse(), ganres);
      }
      renderGanreList(ganres);
    });
};

categoriesData();
