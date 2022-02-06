
////CLICK MOVIE => SINGLE-VIEW
async function getSingle(event) {
    event.preventDefault();
  console.log('GETTING SINGLE');
  
    const movie = this;
    const id = this.id;
  
    document.location.replace(`/movies/single/${id}`)
  
  } 
  
$(".movies").on('click', getSingle);

//CLICK TINY => SINGLE-VIEW
async function getTinySingle(event) {
    event.preventDefault();
  
    const id = this.id;
  
    document.location.replace(`/movies/single/${id}`)
  
  } 
  
$(".tiny-movies").on('click', getTinySingle);


//EDIT REVIEW
async function editReview(event) { 
  event.preventDefault();

  const id = this.name;

  document.location.replace(`/movies/edit/${id}`)
 }

 $(".edit").click(editReview);


 //color picker
$('#picker').on('input', () => {
const color = $('#picker').val()
$('body').css('background', `-webkit-linear-gradient(${color} 0%, #000000 100%)`);
})

//user profile 
$('#user-profile').on('click', () => {
  document.location.replace('/movies/profile');
})


