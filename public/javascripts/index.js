$(document).ready(function() {


    $('#logoutBtn').on('click', function() {
        
        $.ajax({
            url: '/auth/logout', 
            method: 'POST',
            success: function(response) {
                
                window.location.href = '/'; 
            },
            error: function(xhr, status, error) {
                console.error(error);
                alert('Failed to logout. Please try again.');
            }
        });
    });



});