$(document).ready(function() {
    $("#logout").click(function(){
        console.log("You clicked")
      axios.post("http://localhost:3000/api/auth/logout")
      .then(function (response) {
        localStorage.removeItem("jwt")
        $.toast({
          heading: "Logged out",
          text: "You have logged out",
          position: "top-center",
          stack: false,
          icon: "success",
          textAlign: "center",
          hideAfter: 2000,
        });
        window.location.replace("../html/Login.html")
      })
      .catch(function (error) {
        $.toast({
          heading: "Error",
          text: `${error.response.data.error}`,
          position: "top-center",
          stack: false,
          icon: "error",
          textAlign: "center",
          hideAfter: 2000,
        });
      });
    });
  });
  