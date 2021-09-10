
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

////CLICK TINY => SINGLE-VIEW
async function getTinySingle(event) {
    event.preventDefault();
  console.log('GETTING SINGLE');
  
    const id = this.id;
    console.log(id);
  
    document.location.replace(`/movies/single/${id}`)
  
  } 
  
$(".tiny-movies").on('click', getTinySingle);


////EDIT REVIEW
async function editReview(event) { 
  event.preventDefault();

  const id = this.name;
  console.log(id); 

  document.location.replace(`/movies/edit/${id}`)
 }

 $(".edit").click(editReview);


 //color picker
$('#picker').on('input', () => {
const color = $('#picker').val()
$('body').css('background', `-webkit-linear-gradient(${color} 0%, #000000 100%)`);
})




