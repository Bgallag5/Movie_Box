//BACK TO TOP
//Get the button:
topBtn = document.getElementById("topBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 1000 ||
    document.documentElement.scrollTop > 1000
  ) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE
}

//FILTER GENRE
var sortBtn = document.querySelector(".dropdown");

sortBtn.onchange = async function () {
  const genre = $("#dropdown").find("option:selected").text();

  document.location.replace(`/movies/filter/${genre}`);
};

//FILTER BEST
var bestBtn = document.querySelector("#bestBtn");

bestBtn.onclick = async function () {
  document.location.replace(`/movies/best`);
};

////SEARCH BY TITLE
async function searchMovies(event) {
  event.preventDefault();

  const search = document.querySelector("#inputId").value.trim();

  document.location.replace(`/movies/search/${search}`);
}

document.querySelector("#buttonId").addEventListener("click", searchMovies);

////CLICK MOVIE => SINGLE-VIEW
async function getSingle(event) {
  event.preventDefault();

  const movie = this;
  const id = this.id;

  document.location.replace(`/movies/single/${id}`);
}

$(".movies").on("click", getSingle);
