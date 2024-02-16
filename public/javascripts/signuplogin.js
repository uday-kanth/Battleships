$(document).ready(function() {
    $(".info-item .btn").on('click', function() {
      console.log('signup')
      $(".container").toggleClass("log-in");
    });



  
    $(".container-form .btn").on('click', function() {
      console.log('login')
      $(".container").addClass("active");
    });


    $('#signUpBtn').on('click',function() {
      // Get input values
      var email = $('#signupEmail').val();
      var username = $('#signupUsername').val();
      var password = $('#signupPassword').val();

      // Create user object
      var user = {
        email: email,
        username: username,
        password: password
      };

      
      $.ajax({
        url: '/auth/signup',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(user),
        success: function(response) {
          //console.log(response)
          alert('Registered addded successfully');
          window.location.reload();
          
        },
        error: function(xhr, status, error) {
          console.error(error,status);
          alert('Failed to sign up. Please try again.');
          window.location.href = '/auth/signup-login';
        }
      });
    });









    $('#loginBtn').on('click',function() {
      // Get input values
      var email = $('#loginEmail').val();
      var password = $('#loginPassword').val();

      // Create user object
      var user = {
        email: email,
        password: password
      };

      
      $.ajax({
        url: '/auth/login',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(user),
        success: function(response) {
          //console.log(response)
          alert('successfully Loged in');
          window.location.href="/dashboard"
          
        },
        error: function(xhr, status, error) {
          console.log(error.message);
          alert('Failed to login. Please try again.');
          window.location.reload();
        }
      });
    });






  });
  