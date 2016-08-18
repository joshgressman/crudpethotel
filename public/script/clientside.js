$(document).ready(function() {
    getOwners();
    //event listener
    $("#registerButton").on("submit", submitOwners);
    console.log("button works");


});

function submitOwners() {
    event.preventDefault();

    var owners = {};
    var fields = $(this).serializedArray();
    fields.forEach(function(field) {
        owners[field.name] = field.value;
    });
    console.log(owners);

    $.ajax({
        type: "POST",
        url: "/owners",
        data: owners,
        success: function() {
            $("#ownerForm").empty();
            getOwners();
            console.log("Something happens.");
        },

        error: function(response) {
            console.log("POST /did not work");
        },
    });
};

function getOwners() {
    $.ajax({
        type: "GET",
        url: "/owners",
        success: function(owners) {
            //append to DOM
            console.log(owners);
            owners.forEach(function(owner) {
                $(".ownerList").append('<option class = "owner">' + owner.first_name + " " + owner.last_name  + '</option>')
                console.log(owner);
            });

        },
        error: function(response) {
            console.log("GET /did not work");
        },
    });
}
