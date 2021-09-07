async function addFavorite(event) {
  event.preventDefault();

  const id = this.name;
  console.log(id);

  const response = await fetch(`/api/fav/add/${id}`, {
    method: "POST",
    body: JSON.stringify({
      id,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    alert("Added to Favs!");
  } else {
    alert(response.statusText);
  }
}

$("#buttonId").on("click", addFavorite);

async function removeFavorite(event) {
  event.preventDefault();

  const id = this.name;
  console.log(id);

  const response = await fetch(`/api/fav/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    alert("Removed to Favs!");
  } else {
    alert(response.statusText);
  }
}

$("#removeId").on("click", removeFavorite);

async function addReview(event) {
  event.preventDefault();

  const title = document.getElementById("review-title").value;
  const text = document.getElementById("review-text").value;
  const path = document.location.pathname;
  const movieId = path.replace("/movies/single/", "");
  const movieTitle = document.getElementById("movieTitle").textContent;


  const response = await fetch(`/api/reviews`, {
    method: "POST",
    body: JSON.stringify({
      movie_title: movieTitle,
      title: title,
      post_content: text,
      movie_id: movieId,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    alert("Review Submitted!");
  } else {
    alert(response.statusText);
  }
}

$("#review-submit").on("click", addReview);


////DELETE REVIEW - to be used
// async function deleteReview(param) {

//     console.log(window.location);
//     const id = window.location.toString().split('/')[
//         window.location.toString().split('/') .length - 1
//     ]; ///how is this capturing the ID? is there another way?

//     const response = await fetch(`/api/reviews/${id}`, {
//         method: 'DELETE',
//     });

//     if (response.ok) {
//         document.location.reload();    ///assumption is this will reload single-view page
//     } else {
//         alert(response.statusText);
//     }

//   }

//   document.querySelector('delete-review').addEventListener('click', deleteReview);
