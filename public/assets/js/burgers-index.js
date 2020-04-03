// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(() => {
  const leftCol = $(`#left-side-ul`)[0]
  const rightCol = $(`#right-side-ul`)[0]
  // if no list items in "burgers to eat" display message
  if (leftCol.children.length === 0) {
    leftCol.innerHTML = `<p class="p-2 bg-pdp">No burgers to devour. See form below to enter one.</p>`
    // console.log($(`#left-side-ul`))
  }

  // if no list items in "devoured burgers" display message
  if (rightCol.children.length === 0) {
    rightCol.innerHTML = `<p class="p-2 bg-pdp">No burgers have been eaten. Enter and then devour one.</p>`
  }


  $(rightCol).on(`click`, e => {

    const infoList = $(`.devoured-info`)

    // e.preventDefault()
    if ($(e.target).data(`name`) === `burger-info`) {
      for (let i = 0; i < infoList.length; i++) {

        if ($(infoList[i]).data(`id`) === $(e.target).data(`id`)) {

          if ($(infoList[i].children[1]).attr(`style`) === `display: none;`) {

            $(infoList[i].children[0]).hide()
            $(infoList[i].children[1]).show()

          } else {
            $(infoList[i].children[1]).hide()
            $(infoList[i].children[0]).show()

          }

        }

      }
    }

    if ($(e.target).data(`isbutton`)) {
      switch ($(e.target).data(`typeofbutton`)) {
        case `edit`:
          console.log(`editing stuff`)
          break;
        case `delete`:
          // Send the DELETE request.
          $.ajax(`/api/burgers/` + $(e.target).data(`id`), {
            type: `DELETE`,
          }).then(() => {
              // Reload the page to get the updated list
              location.reload()
            }
          )
          break;

        default:
          break;
      }
    }
  })

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
