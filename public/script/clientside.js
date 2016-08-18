$(document).ready(function() {
    getOwners();
    //event listener
    $("#registerButton").on("click", submitOwners);
});

function submitOwners() {
    event.preventDefault();

    console.log("POSTING");

    var owners = {};
    $.each($('#ownerForm').serializeArray(), function (i, field) {
      owners[field.name] = field.value;
    });

    $.ajax({
        type: "POST",
        url: "/owners",
        data: owners,
        success: function() {
            console.log("POST /owners Succeded.");
            // $("#ownerForm").empty();
            // getOwners();
        },

        error: function(response) {
            console.log("POST /owners failed");
        },
    });
};

function getOwners() {
    $.ajax({
        type: "GET",
        url: "/owners",
        success: function(owners) {
            //append to DOM
            owners.forEach(function(owner) {
                $(".ownerList").append('<option class = "owner">' + owner.first_name + " " + owner.last_name  + '</option>');
            });
        },
        error: function(response) {
            console.log("GET /did not work");
        },
    });
}
