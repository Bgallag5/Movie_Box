// // Call for buttons to activate carousel
// const prevButton = document.getElementById("prev-button")
// const nextButton = document.getElementById("next-button")

// function previous() {
//     prevButton.onclick
// }
// // function needs to call previous images (or none for start) on click

// function next() {
//     nextButton.onclick
// }
// // Functions needs to proceed to next images on click


// // Call Functions
// previous();
// next();


//var index = 0;

//function changeBanner() {
//    [].forEach.call(document.images, function(v, i) {
//        document.images[i].hidden = i !== index
//    });
//    index = (index + 1) % document.images.length;
//}
//window.onload = function() {
//    setInterval(changeBanner, 1000)
//};

// var dashReview = document.getElementById("dash-reviews")
// var reviewCards = document.getElementById("review-cards")

// NEED MORE INFO FROM SINGLE -VIEW 
//var reviewText = document.getElementById()
//


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