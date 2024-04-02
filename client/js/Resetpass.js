$(document).ready(function(){
    $("#reset").click(function (e) {
        console.log("u clicked resst")
        e.preventDefault();
    
        const email = $("#email").val();
        const currentpassword = $("#currentpassword").val();
        const newpassword = $("#newpassword").val();
    
        if (!email || !currentpassword || !newpassword) {
          $.toast({
            heading: "Error",
            text: "Please fill out all required fields",
            position: "top-center",
            stack: false,
            icon: "error",
            textAlign: "center",
            hideAfter: 2000,
          });
          return;
        }
    
        axios
          .post(
            "http://localhost:3000/api/auth/resetpassword",
            {
              email:email,
              currentPassword:currentpassword,
              newPassword:newpassword
            }
          )
    
          .then(function (response) {
            $.toast({
              heading: "Successfull",
              text: "You have changed password successfully",
              position: "top-center",
              stack: false,
              icon: "success",
              textAlign: "center",
              hideAfter: 2000,
            });
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
})