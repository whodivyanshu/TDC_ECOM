function add() {
    // Get the values from the input fields
    const name = document.getElementById("name").value;
    const imageurl = document.getElementById("imgurl").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("desc").value;
  
    // Create an object to hold the data
    const newData = {
      name,
      imageurl,
      price,
      description,
    };
  
    // Send a POST request to the server
    fetch("http://localhost:3000/addData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data added:", data);
        // Optionally, clear the input fields or perform any other actions
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
      window.location.reaload();
  }
  