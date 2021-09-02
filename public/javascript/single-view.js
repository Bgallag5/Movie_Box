
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
} else {
    alert(response.statusText);
}
}

 $('#buttonId').on('click', addFavorite)

