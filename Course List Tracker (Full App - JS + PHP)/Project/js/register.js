window.addEventListener("load", function() {

    /**
     * jQuery function to disable keypress for space
     */
    $(function() {
        $('#username').on('keypress', function(e) {
            if (e.which == 32)
                return false;
        });
    });
    /**
     * This function should be called when the AJAX call is complete
     * and the json-encoded array has been extracted from the response.
     * @param {Array} items 
     */
    function success(items) {

        $('#register').on('input', function(e) {
            for (let i = 0; i < items.length; i++) {
                console.log(items[i].email);
                if (items[i].username.toLowerCase() == $("#username").val().toLowerCase() && items[i].email.toLowerCase() != $("#email").val().toLowerCase()){
                    e.preventDefault();
                    $('#error').fadeIn();
                    $("#error").html("Username already exists");
                    $('#submit').prop('disabled', true);
                    break;
                }else if (items[i].username.toLowerCase() != $("#username").val().toLowerCase() && items[i].email.toLowerCase() == $("#email").val().toLowerCase()){
                    e.preventDefault();
                    $('#error').fadeIn();
                    $("#error").html("Email already exists");
                    $('#submit').prop('disabled', true);
                    break;
                }else if (items[i].username.toLowerCase() == $("#username").val().toLowerCase() && items[i].email.toLowerCase() == $("#email").val().toLowerCase()){
                    e.preventDefault();
                    $('#error').fadeIn();
                    $("#error").html("Email and Username already exists");
                    $('#submit').prop('disabled', true);
                    break;
                }
                else{
                    $('#error').fadeOut();
                    $("#error").html("");
                    $('#submit').prop('disabled', false);
                    continue;
                }
            }
        });
    }


    let url = "server/getmembers.php";

    // do the fetch
    fetch(url, { credentials: 'include' })
        .then(response => response.json())
        .then(success)

});