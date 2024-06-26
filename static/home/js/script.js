document.addEventListener('DOMContentLoaded', (event) => {
  let searchBar = document.querySelector('.search-bar-container');
  let formBtn = document.querySelector('#login-btn');
  let loginForm = document.querySelector('.login-form-container');
  let loginFormClose = document.querySelector('#login-form-close');
  let registerNow = document.querySelector('#register-now');
  let registerForm = document.querySelector('.register-form-container');
  let registerFormClose = document.querySelector('#register-form-close');
  let loginNow = document.querySelector('#login-now');
  let menu = document.querySelector('#menu-bar');
  let navbar = document.querySelector('.navbar');
  let videoBtn = document.querySelectorAll('.vid-btn');

  window.onscroll = () => {
      searchBar.classList.remove('active');
      menu.classList.remove('fa-times');
      navbar.classList.remove('active');
      loginForm.classList.remove('active');
      registerForm.classList.remove('active');
  }

  menu.addEventListener('click', () => {
      menu.classList.toggle('fa-times');
      navbar.classList.toggle('active');
  });

  navbar.addEventListener('click', () => {
      menu.classList.toggle('fa-times');
      navbar.classList.toggle('active');
  });

  if (formBtn) {
      formBtn.addEventListener('click', () => {
          loginForm.classList.toggle('active');
      });
  }

  if (loginFormClose) {
      loginFormClose.addEventListener('click', () => {
          loginForm.classList.remove('active');
      });
  }

  if (registerNow) {
      registerNow.addEventListener('click', () => {
          loginForm.classList.remove('active');
          registerForm.classList.add('active');
      });
  }

  if (registerFormClose) {
      registerFormClose.addEventListener('click', () => {
          registerForm.classList.remove('active');
      });
  }

  if (loginNow) {
      loginNow.addEventListener('click', () => {
          registerForm.classList.remove('active');
          loginForm.classList.add('active');
      });
  }

  videoBtn.forEach(btn => {
      btn.addEventListener('click', () => {
          document.querySelector('.controls .active').classList.remove('active');
          btn.classList.add('active');
          let src = btn.getAttribute('data-src');
          document.querySelector('#video-slider').src = src;
      });
  });

  var swiper1 = new Swiper(".review-slider", {
      spaceBetween: 20,
      loop: true,
      autoplay: {
          delay: 2500,
          disableOnInteraction: false,
      },
      breakpoints: {
          640: {
              slidesPerView: 1,
          },
          768: {
              slidesPerView: 2,
          },
          1024: {
              slidesPerView: 3,
          },
      },
  });

  var swiper2 = new Swiper(".brand-slider", {
      spaceBetween: 20,
      loop: true,
      autoplay: {
          delay: 2500,
          disableOnInteraction: false,
      },
      breakpoints: {
          450: {
              slidesPerView: 2,
          },
          768: {
              slidesPerView: 3,
          },
          991: {
              slidesPerView: 4,
          },
          1200: {
              slidesPerView: 5,
          },
      },
  });
});
