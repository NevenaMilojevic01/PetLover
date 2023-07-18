(async function ($) {
  "use strict";

  const loggedInUserParagraph = document.querySelector("#logged-in-user");
  const logoutButton = document.querySelector("#logout-button");

  const token = sessionStorage.getItem("id_token");
  const userEmail = sessionStorage.getItem("email");

  if (!token) {
    // window.location.href = "login.html";
  } else {
    if (userEmail) {
      loggedInUserParagraph.innerHTML = userEmail;
    } else {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAEP_ydlwLDo-CpytHQnndOgnVtjFecMOU",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: token,
            }),
          }
        );

        const data = await response.json();

        const email = data?.users[0]?.email;
        loggedInUserParagraph.innerHTML = email;

        sessionStorage.setItem("email", email);
      } catch (error) {
        alert(error?.message || error);
      }
    }
  }

  logoutButton.addEventListener("click", async (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = "login.html";
  });

  // Dropdown on mouse hover
  $(document).ready(function () {
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $(".navbar .dropdown")
          .on("mouseover", function () {
            $(".dropdown-toggle", this).trigger("click");
          })
          .on("mouseout", function () {
            $(".dropdown-toggle", this).trigger("click").blur();
          });
      } else {
        $(".navbar .dropdown").off("mouseover").off("mouseout");
      }
    }
    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Date and time picker
  $("#date").datetimepicker({
    format: "L",
  });
  $("#time").datetimepicker({
    format: "LT",
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    center: true,
    autoplay: true,
    smartSpeed: 2000,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
})(jQuery);
