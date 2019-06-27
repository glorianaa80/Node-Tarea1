fetch ('http://localhost:5000/api/v1/cars')
  .then((data) => data.json())
  .then((json) => cars(json))
  function cars(data){
    console.log(data);
}