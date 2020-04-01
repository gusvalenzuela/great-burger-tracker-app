// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(`.change-state`).on(`click`, function(event) {

    console.log(`click`, event.target)

    const id = $(this).data(`id`);
    const newlyEaten = $(this).data(`newstate`)

    const newEatState = {
      sleepy: newlyEaten
    };

    // Send the PUT request.
    $.ajax(`/api/burgers/` + id, {
      type: `PUT`,
      data: newEatState
    }).then(
      function() {
        console.log(`changed devoured to`, newlyEaten)
        // Reload the page to get the updated list
        location.reload()
      }
    );
  });

  // $(`.create-form`).on(`submit`, function(event) {
  //   // Make sure to preventDefault on a submit event.
  //   event.preventDefault()

  //   var newBurger = {
  //     // name: $(`#ca`).val().trim(),
  //     devour: $(`[name=devoured]:checked`).val().trim()
  //   };

  //   // Send the POST request.
  //   $.ajax(`/api/burgers`, {
  //     type: `POST`,
  //     data: newburger
  //   }).then(
  //     function() {
  //       console.log(`created new burger`)
  //       // Reload the page to get the updated list
  //       location.reload()
  //     }
  //   )
  // })

  $(`.devour-burger`).on(`click`, function(event) {
    var id = $(this).data(`id`)

    // Send the DELETE request.
    $.ajax(`/api/burgers/` + id, {
      type: `DELETE`
    }).then(
      function() {
        console.log(`burger devoured`, id)
        // Reload the bpage to get the updated list
        location.reload()
      }
    )
  })
})
