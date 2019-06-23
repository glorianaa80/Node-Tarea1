fetch ('http://localhost:5000/api/v1/cars') 
  .then((data) => data.json())
  .then((json) => activity(json))
  function cars () {
    console.log(data);
}

