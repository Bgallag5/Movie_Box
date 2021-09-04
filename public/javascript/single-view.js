
async function addFavorite(event) {
event.preventDefault();

const id = (this.name);
console.log(id);

const response = await fetch(`/api/fav/add/${id}`, {
    method: "POST",
    body: JSON.stringify({
      id
    }),
    headers: { "Content-Type": "application/json" },
});
if(response.ok){
    console.log('ADDED TO FAVS')
    alert('Added to Favs!')
} else {
    alert(response.statusText);
}
}

 $('#buttonId').on('click', addFavorite)

async function addReview (event){
    event.preventDefault();

    const title = document.getElementById('review-title').value
    const text = document.getElementById('review-text').value;
    console.log(title, text);
    console.log(document.location);
    const path = document.location.pathname
    const movieId = path.replace('/movies/single/', "")
    console.log(movieId);

    const response = await fetch(`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            post_content: text,
            movie_id: movieId,
        }),
        headers: { "Content-Type": "application/json" },
    });
    if(response.ok){
        console.log('REVIEW SUBMITTED')
        alert('Review Submitted!')
    } else {
        alert(response.statusText);
    }

}

$('#review-submit').on('click', addReview);