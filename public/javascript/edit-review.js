async function saveReview(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const post_content = document.getElementById("review-text").value;
  const id = this.name;

  const response = await fetch(`/movies/editReview/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      post_content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

$("#submit").on("click", saveReview);

///hide navigation cause too lazy to do in hbs
$(".navbar-nav").hide();
