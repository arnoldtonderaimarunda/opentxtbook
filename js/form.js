$(document).ready(function () {
    $("form").submit(function (event) {
      var formData = {
        firstname: $("#firstname").val(),
        lastname: $("#lastname").val(),
        jobtitle: $("#jobtitle").val(),
        company: $("#company").val(),
        country: $("#country").val(),
        url: $("#url").val(),
        requests: $("#requests").val(),
        apps: $("#apps").val(),            
        data: $("#data").val(),
        budget: $("#budget").val(),  
        etd: $("#etd").val(), 
        email: $("#email").val()
      };

      $.ajax({
        type: "POST",
        url: "https://hooks.zapier.com/hooks/catch/2194087/byic4bk/",
        data: formData,
        dataType: "json",
        encode: true,
      }).done(function (data) {
        console.log(data);

        if (!data.status === 'success') {
         
        } else {
          $("form").html(
            '<div class="alert alert-success">' + 'Thank you. Request for proposal submitted successfully.' + "</div>"
          );
        }

      }).fail(function (data) {
        $("form").html(
          '<div class="alert alert-danger">Could not reach server, please try again later.</div>'
        );
      });

      event.preventDefault();
    });
  });