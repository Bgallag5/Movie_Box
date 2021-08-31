async function postReview(param) {
    ///check if logged in here? or in helpers and call here? 
    ///grab content of post 
    const review = document.getElementById('#IDGOESHERE').value;     ////const title = document.querySelector('input[name="post-title"]').value; in module---handlebars thing??
    ///make a POST to the db
    const response = await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({ review }),
        headers: {
          'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();   ///assumption is this will reload single-view page 
    } else {
        alert(response.statusText);
    }

  }

  document.querySelector('post-review').addEventListener('submit', postReview);


async function editReview(param) {
    ///check if logged in here? or in helpers and call here? 
    ///grab content of post 
    const review = document.getElementById('#IDGOESHERE').value.trim();   
    console.log(window.location);
    const id = window.location.toString().split('/')[
        window.location.toString().split('/') .length - 1
    ]; ///how is this capturing the ID? is there another way?

    const response = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ review }),
        headers: {
          'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();   ///assumption is this will reload single-view page 
    } else {
        alert(response.statusText);
    }

  }

  document.querySelector('edit-review').addEventListener('submit', editReview);


async function deleteReview(param) {

    console.log(window.location);
    const id = window.location.toString().split('/')[
        window.location.toString().split('/') .length - 1
    ]; ///how is this capturing the ID? is there another way?

    const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.reload();    ///assumption is this will reload single-view page 
    } else {
        alert(response.statusText);
    }

  }

  document.querySelector('delete-review').addEventListener('click', deleteReview);




