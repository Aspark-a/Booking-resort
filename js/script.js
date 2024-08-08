// // script.js

// // Get the sign in form
// const signInForm = document.getElementById('sign-in-form');

// // Get the sign up form
// const signUpForm = document.getElementById('sign-up-form');

// // Add event listener to the sign in form
// signInForm.addEventListener('submit', (e) => {
//   // Prevent the default form submission behavior
//   e.preventDefault();

//   // Get the username and password values
//   const username = document.getElementById('username').value;
//   const password = document.getElementById('password').value;

//   // Check if the username and password values match the stored values
//   const storedUser = localStorage.getItem('user');
//   if (storedUser) {
//     const storedUserObject = JSON.parse(storedUser);
//     if (storedUserObject.username === username && storedUserObject.password === password)
      
  