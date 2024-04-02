$(document).ready(function () {
  // FOR REGISTER
  $("#submit").click(function (e) {
    e.preventDefault();

    const fullName = $("#fullname").val();
    const username = $("#username").val();
    const email = $("#email").val();
    const password = $("#password").val();
    const gender = $('input[name="gender"]:checked').val();

    if (!fullName || !username || !email || !password || !gender) {
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
        "http://localhost:3000/api/auth/signup",
        {
          fullName: fullName,
          username: username,
          email: email,
          password: password,
          gender: gender,
        },
        {
          withCredentials: true,
        }
      )

      .then(function (response) {
        $.toast({
          heading: "Registered",
          text: "You have successfully registered",
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

  // FOR LOGIN
  $("#login-submit").click(function (e) {
    e.preventDefault();

    const username = $("#username").val();
    const password = $("#password").val();

    if (!username || !password) {
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
        "http://localhost:3000/api/auth/login",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        // Handle successful login response
        $.toast({
          heading: "Logged in",
          text: "You have successfully Logged in",
          position: "top-center",
          stack: false,
          icon: "success",
          textAlign: "center",
          hideAfter: 2000,
        });

        window.location.replace('http://127.0.0.1:5500/client/html/index.html');
      })
      .catch(function (error) {
        // Handle login error
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
