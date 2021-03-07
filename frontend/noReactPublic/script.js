window.addEventListener("load", () => {
  console.log("The Client is running...");

  let form = document.getElementById("uploadForm");
  
  form.addEventListener("submit", (event) => {
      event.preventDefault();

      console.log("Default form submit on hold...");

      let myFormData = new FormData();
      let userFile = document.querySelector("input[type='file']").files[0];
      let userName = document.querySelector("input[type='text']").value;

      myFormData.append("userName", userName);
      myFormData.append("userFile", userFile);

      fetch("/upload", {
          method: "POST",
          body: myFormData,
      })
          .then((response) => response)
          .then((data) => {
              console.log(data);
          });
  });
});