$(document).ready(function() {
    getOwners();
    getGuests();
    //event listener
    $("#registerButton").on("click", submitOwners);
    $('#addPet').on('click', submitPets);
    $('#tableContainer').on('click', '.deleteBtn', deleteUser);
});

function deleteUser() {
  // Get pets id from the table row.
  var id = $(this).parent().parent().data("id");

  // Delete row that the delete button is in.
  $(this).parent().parent().remove();

  $.ajax({
    type: "DELETE",
    url: "/pets/" + id,
    success: function() {
      console.log("Delete success");
    },
    error: function() {
      console.log("Failed");
    },
  });


}

function submitPets() {
  event.preventDefault();

  var name = $( ".ownerList option:selected" ).text();
  console.log('name: ', name);

  var pets = {};
  $.each($('#petForm').serializeArray(), function (i, field) {
    pets[field.name] = field.value;
  });

  pets.ownerName = name;

  $.ajax({
      type: "POST",
      url: "/pets",
      data: pets,
      success: function() {
          console.log("POST /pets Succeded.");
          getGuests();
      },
      error: function(response) {
          console.log("POST /pets failed");
      },
  });

}



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
            $("#ownerList").empty();
            getOwners();
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

function getGuests() {
  $.ajax({
    type: "GET",
    url: "/guests",
    success: function (guests) {
      guests.forEach (function (guest){
        var $el = $("#tableContainer").append('<tr>' +'<td>'+ guest.first_name + '' + guest.last_name + '</td>'+ '<td>'+ guest.name + '</td>'+'<td>' + guest.color +'</td>' + '<td>' + guest.breed + '</td>' + '<td><button>Update</button></td>'+
        '<td><button class="deleteBtn">Delete</button></td>'+ '<td><button>Check In / Out</button></td>'+ '</tr>');

        console.log("OG ID: ", guest.id);
        // Set id on last table row.
        $el.children().children().last().data('id', guest.id);


      });
    },
    error: function(response){
      console.log("GET/did not work");
    },
  });
}
