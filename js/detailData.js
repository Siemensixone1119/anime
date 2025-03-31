import bgElement from "./bg-element.js";

const detailData = () => {
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

  const renderAnimeDetails = (arr, itemId) => {
    const animeObj = arr.find((item) => item.id == itemId);
    const imageBlock = document.querySelector(".anime__details__pic");
    const viewsBlock = imageBlock.querySelector(".view");
    const titleBlock = document.querySelector(".anime__details__content h3");
    const subTitleBlock = document.querySelector(
      ".anime__details__content span"
    );
    const descriptionBlock = document.querySelector(
      ".anime__details__content p"
    );
    const widgetList = document.querySelectorAll(
      ".anime__details__widget ul li"
    );
    const breadCrumb = document.querySelector(".breadcrumb__links span");
    console.log(breadCrumb);

    if (animeObj) {
      imageBlock.dataset.setbg = animeObj.image;
      bgElement();

      viewsBlock.insertAdjacentHTML(
        "beforeend",
        `<i class="fa fa-eye">${animeObj.views}</i>`
      );

      titleBlock.textContent = animeObj.title;
      subTitleBlock.textContent = animeObj["original-title"];
      descriptionBlock.textContent = animeObj.description;

      widgetList[0].insertAdjacentHTML(
        "beforeend",
        `<span>Date aired:</span> ${animeObj.date}`
      );
      widgetList[1].insertAdjacentHTML(
        "beforeend",
        `<span>Rating:</span> ${animeObj.rating}`
      );
      widgetList[2].insertAdjacentHTML(
        "beforeend",
        `<span>Genre:</span> ${animeObj.tags.join(", ")}`
      );

      breadCrumb.textContent = animeObj.ganre;
    } else {
      console.log("404");
    }
  };

  fetch(
    "https://anime-be8cd-default-rtdb.europe-west1.firebasedatabase.app/anime.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const ganres = new Set();
      const ganreParams = new URLSearchParams(window.location.search).get(
        "itemId"
      );
      console.log(ganreParams);

      data.forEach((item) => {
        ganres.add(item.ganre);
      });

      if (ganreParams) {
        renderAnimeDetails(data.reverse(), ganreParams);
      } else {
        console.log("404");
      }
      renderGanreList(ganres);
    });
};

detailData();
