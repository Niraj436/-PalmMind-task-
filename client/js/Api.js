$(document).ready(function () {
  // GET ALL USERS
  axios
    .get("http://localhost:3000/api/users")
    .then(function (response) {
      const users = response.data;
      const tbody = $(".custom-table tbody");

      const rows = users.map(function (user, i) {
        const sn = i + 1;
        return `
                    <tr class="user-row" data-user-id="${user._id}">
                        <td>${sn}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.gender}</td>
                    </tr>
                `;
      });

      tbody.html(rows.join(""));
    })
    .catch(function (error) {
      console.error("Error fetching data:", error);
    });

  $(document).on("click", ".user-row", function () {
    $(".model").show(700);
  });

  // getuser
  $(".custom-table tbody").on("click", ".user-row", function () {
    const userId = $(this).data("user-id"); // Retrieve the user ID from the clicked row

    // Fetch user data based on the ID
    axios
      .get(`http://localhost:3000/api/users/${userId}`)
      .then(function (response) {
        const user = response.data;

        // Update the content of the model container with user details
        $(".model .card-body").html(`
        <img
                  src=${user.profilePic}
                  class="card-img-top mx-auto d-flex justify-content-center pt-3"
                  alt="..."
                  style="width: 10rem"
                />
                    <p><span class="fw-bold">Username: </span>${user.username}</p>
                    <p><span class="fw-bold">FullName: </span>${user.fullName}</p>
                    <p><span class="fw-bold">Email: </span>${user.email}</p>
                    <p><span class="fw-bold">Gender: </span>${user.gender}</p>
                    <span class="fw-bold">Introduction:</span>
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque non fuga sequi quibusdam, necessitatibus amet?
                 <p class="card-text"></p>
                    <a href="#" class="btn btn-primary w-100 close-model">Close</a>
                `);
      })
      .catch(function (error) {
        console.error("Error fetching user data:", error);
      });
  });

  $(".model").hide();

  $(document).on("click", ".close-model", function () {
    $(".model").hide(500);
  });

  $(".cancel-model").on("click", function () {
    $(".model").hide();
    console.log("you clicked cancel button");
  });
});

// get user
