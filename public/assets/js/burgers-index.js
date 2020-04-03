// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(() => {
  if($(`#left-side-ul`)[0].children.length === 0){
    $(`#left-side-ul`)[0].innerHTML = `<p class="p-2 bg-pdp">No burgers to devour. See form below to enter one.</p>`
    // console.log($(`#left-side-ul`))
  } 
  
  if($(`#right-side-ul`)[0].children.length === 0){
    $(`#right-side-ul`)[0].innerHTML = `<p class="p-2 bg-pdp">No burgers have been eaten. Enter and then devour one.</p>`
  }

  $(`.change-state`).on(`click`, e => {
    // reserve for later (eat again)
    // const newlyEaten = $(this).data(`newstate`)

    // Send the PUT request.
    $.ajax(`/api/burgers/` + $(e.target).data(`id`), {
      type: `PUT`,
      data: {
        devoured: 1,
        date_eaten: `NOW()`
      }
    }).then(() => {
      console.log(`burger devoured!`)
      // Reload the page to get the updated list
      location.reload()
    }
    );
  });

  $(`.create-form`).on(`submit`, e => {
    // Make sure to preventDefault on a submit event.
    e.preventDefault()
    const input = $(`#burger`).val().trim()

    if (!input || input == `` || input === undefined) {
      return $(`#burger`).val(``)
    } else {

      const newBurger = {
        name: input,
      };

      // Send the POST request.
      $.ajax(`/api/burgers`, {
        type: `POST`,
        data: newBurger
      }).then(
        function () {
          // Reload the page to get the updated list
          location.reload()
        }
      )

    }
  })

  $(`.delete-burger`).on(`click`, e => {
    var id = $(this).data(`id`)

    // Send the DELETE request.
    $.ajax(`/api/burgers/` + id, {
      type: `DELETE`
    }).then(() => {
      // Reload the bpage to get the updated list
      location.reload()
    })
  })
})
