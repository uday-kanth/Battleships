$(document).ready(() => {

  $('.unfriend-btn').click(function() {

    var friendUsername = $(this).data('friend');

    // Send friendUsername to the /unfriend route
    $.ajax({
      url: 'friends/unfriend',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ friend: friendUsername }),
      success: function(response) {
        alert('Successfully unfriended ' + friendUsername);
        // Optionally, you can remove the card from the UI upon successful unfriending
        window.location.reload();

      },
      error: function(xhr, status, error) {
        console.error('Error unfriending friend:', error);
        alert('Failed to unfriend ' + friendUsername);
      }
    });
  });




  $('.invite-btn').click(function() {
    var friendUsername = $(this).data('friend');
    // Make an AJAX request to start a room and send room code via mail
    $.ajax({
        url: 'friends/startRoomAndSendMail',
        method: 'POST',
        data: { friend: friendUsername },
        success: function(response) {
            alert('Room started and email sent to ' + friendUsername);
            //console.log(response)
            window.location.href=response.url
        },
        error: function(xhr, status, error) {
            alert('Error: ' + error);
        }
    });
});

    
   
  });
  