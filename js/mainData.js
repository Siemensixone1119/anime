export default function mainData() {
  fetch("https://anime-be8cd-default-rtdb.europe-west1.firebasedatabase.app/anime.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}
