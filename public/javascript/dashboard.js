
////CLICK MOVIE => SINGLE-VIEW
async function getSingle(event) {
    event.preventDefault();
  console.log('GETTING SINGLE');
  
    const movie = this;
    const id = this.id;
    console.log(id);
    console.log(movie);
  
    document.location.replace(`/movies/single/${id}`)
  
  } 
  
$(".movies").on('click', getSingle);


////EDIT REVIEW
async function editReview(event) { 
  event.preventDefault();

  const id = this.name;
  console.log(id); 

  document.location.replace(`/movies/edit/${id}`)
 }

 $(".edit").click(editReview);

//  document.querySelector('.edit').addEventListener('click', editReview)




