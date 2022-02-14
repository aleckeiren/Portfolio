/**
 * Alec Pasion, 000811377
 * Created: November 26, 2020
 * Gets the json encoded list of items and displays the items to the user
 */
window.addEventListener("load", function() {

    let content = document.getElementById('content');
    /**
     * Gets an item and converts it to an HTML form element.
     * @param {item} item 
     */
    function itemToHtml(item) {
        content.innerHTML += "<form class = 'courseItem' action='server/updateitem.php' method='post' autocomplete='off' id='courseitem'> <input type='hidden' name='id' id ='id' value = " + item.id + "><input type='text' class = 'course' name='course' placeholder='Course' id='course' value = " + item.course + "> <input type='text' name='professor' placeholder='Professor' id='professor' value = " + item.professor + "> <input type = 'submit' id ='update' value = 'Update (Blank fields for delete)'> </form>";
        return content
    }

    /**
     * This function should be called when the AJAX call is complete
     * and the json-encoded array has been extracted from the response.
     * @param {Array} items 
     */
    function success(items) {
        let itemslist = "";
        for (let i = 0; i < items.length; i++) {
            itemslist += itemToHtml(items[i]);
        }
        /**
         * Event listener for input to stop adding duplicate course
         */
        $('#courseform').on('input', function(e) {
            for (let i = 0; i < items.length; i++) {
                for (let i = 0; i < items.length; i++) {
                    if (items[i].course.toLowerCase() == document.getElementById('Course').value.toLowerCase()){
                        e.preventDefault();
                        $('#error').fadeIn();
                        $("#error").html("Course already exists");
                        $('#submit').prop('disabled', true);
                        break;
                    }else{
                        $('#error').fadeOut();
                        $("#error").html("");
                        $('#submit').prop('disabled', false);
                        continue;
                    }
                }
            }
        });
    }


    let url = "server/getlist.php";

    // do the fetch
    fetch(url, { credentials: 'include' })
        .then(response => response.json())
        .then(success)

});