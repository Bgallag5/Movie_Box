//  const btn = document.querySelector("button");
//       const post = document.querySelector(".post");
//       const widget = document.querySelector(".star-widget");
//       const editBtn = document.querySelector(".edit");
//       btn.onclick = ()=>{
//         widget.style.display = "none";
//         console.log (post.value);
//         post.style.display = "block";
//         editBtn.onclick = ()=>{
//           widget.style.display = "block";
//           post.style.display = "none";
//         }
//         return false;
//       }
    
// const btn = document.querySelector("btn")
// const post = document.querySelector("post");
// btn.onclick = function(){
// console.log(reviewText.value)


// }



// async function addFavorite(title, user_id) { 
//     // const oldFavs = UserFavs.findAll({ where user_id: id})
//     ///var favorites = (oldFavs.split + title).join(;)
//     /////UserFav.create(where favorites += set(favorites)?)      IS THIS EVEN CLOSE? ACTUALLY SOME OF THIS join/split is done in UserFav model
//  }


async function addFavorite(event) {
event.preventDefault();
console.log('SUPFUCKERS');

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


//  const response = await fetch("/api/user/login", {
//     method: "post",
//     body: JSON.stringify({
//       email,
//       password,
//     }),
//     headers: { "Content-Type": "application/json" },
//   });

//   if (response.ok) {
//     console.log('RESPONSE.OK');
//     document.location.replace("/movies");
//     console.log('LOCATION REPLACED');
//   } else {
//     ///betterlooking 'please enter req info'
//     alert(response.statusText);
//   }