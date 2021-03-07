import { useEffect, useState } from "react";
import './App.css';

function App() {
  console.log("The Client is running...");

  let [postNow, setPostNow] = useState(false);

  useEffect(() => {
      if (!postNow) return;

      let myFormData = new FormData();

      let object = [];

      let inputs = document.querySelectorAll("input[type='text']");

      for (let i = 0; i < inputs.length; i++) {
          let name = inputs[i].getAttribute("id");
          object[`${name}`] = inputs[i].value;
      }

      myFormData.append("userData", JSON.stringify(object));
      myFormData.append("userFile", document.querySelector("input[type='file']").files[0]);

  /*     let upload = document.querySelector("input[type='file']").files[0];
      let uname = document.querySelector("input[type='text']").value;
      let uName = document.getElementById("name").value;
      let uEmail = document.getElementById("email").value;
	  let pCode = document.getElementById("postcode").value;
	  let uCity = document.getElementById("city").value;
	  let uStreet = document.getElementById("street").value;
	  let uHouseNr = document.getElementById("houseNumber").value;

      myFormData.append("userName", uname);
	  myFormData.append("userFile", upload);
	  myFormData.append("uName", uName);
	  myFormData.append("uEmail", uEmail);
	  myFormData.append("pCode", pCode);
	  myFormData.append("uCity", uCity);
	  myFormData.append("uStreet", uStreet);
	  myFormData.append("uHouseNr", uHouseNr); */
	  
	

      fetch("http://localhost:9999/upload", {
          method: "POST",
          mode: "no-cors",
          body: myFormData,
      })
          .then((response) => response)
          .then((data) => 
          {console.log("Success", data)});

      setPostNow(false);
  }, [postNow]);

  // let form = document.getElementById("uploadForm");

  let clickHandler = () => {
      setPostNow(true);
  };

  return (
      <div className="App">
          <h1>Express Upload</h1>
          <div id="uploadForm">
          <div id="logo"></div>
              <label htmlFor="userName">User Name:</label>
              <input type="text" id="userName" name="userNameInput" />
              <label htmlFor="name">Full Name:</label>
              <input type="text" id="name" name="nameInput" />
              <label htmlFor="email">E-mail address:</label>
              <input type="text" id="email" name="emailInput" />
              <label htmlFor="postCode">Postcode:</label>
              <input type="text" id="postcode" name="postcodeInput" />
              <label htmlFor="city">City:</label>
              <input type="text" id="city" name="cityInput" />
              <label htmlFor="street">Street:</label>
              <input type="text" id="street" name="streetInput" />
              <label htmlFor="houseNumber">House number:</label>
              <input type="text" id="houseNumber" name="houseNumberInput" />
              <input type="file" name="uploadedFile" />
              <input type="submit" value="Upload!" onClick={clickHandler} />
              <button onClick={clickHandler}>Send</button>
          </div>
      </div>
  );
}

export default App;


