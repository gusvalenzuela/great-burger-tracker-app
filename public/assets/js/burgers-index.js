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

    e.preventDefault()
    if ($(e.target).data(`name`) === `morebutton`) {
      for (let i = 0; i < infoList.length; i++) {

        if ($(infoList[i]).data(`id`) === $(e.target).data(`id`)) {

          if ($(infoList[i].children[1].children[0]).attr(`style`) === `display: none;`) {

            $(infoList[i].children[0]).hide()
            $(infoList[i].children[1].children[0]).show()

          } else {
            console.log($(infoList[i].children[1].children[0]))
            // $($(infoList[i].children[0]).children[0]).show()
            $(infoList[i].children[0]).show()
            $(infoList[i].children[1].children[0]).hide()

          }

        }

      }
    }

    if ($(e.target).data(`isbutton`)) {
      switch ($(e.target).data(`typeofbutton`)) {
        case `edit`:
          console.log(`editing stuff`)
          break;
        case `add`:
          // let confirm = 
          if (confirm(`Would you like to add this back to the "burgers to eat" list?`)) {
            updateDevour($(e.target).data(`id`), 0)
          }
          break;
        case `delete`:
          if (confirm(`Would you like to delete this burger?`)) {
            // Send the DELETE request - passing id as parameter
            deleteBurger($(e.target).data(`id`))
          }
          break;

        default:
          break;
      }
    }
  })

  $(`.change-state`).on(`click`, e => {

    if ($(e.target).data(`typeofbutton`) !== `add`) {
      // console.log(e.target)

      updateDevour($(e.target).data(`id`), 1)
    }

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

      addBurger(newBurger)

    }
  })

  const deleteBurger = id => {
    // Send the DELETE request.
    $.ajax(`/api/burgers/` + id, {
      type: `DELETE`,
    }).then(() => {
      // Reload the page to get the updated list
      location.reload()
    }
    )
  }

  const addBurger = burgername => {// Send the POST request.
    $.ajax(`/api/burgers`, {
      type: `POST`,
      data: burgername
    }).then(
      function () {
        // Reload the page to get the updated list
        location.reload()
      }
    )
  }

  const updateDevour = (id, state) => {// Send the POST request.
    // Send the PUT request.
    $.ajax(`/api/burgers/` + id, {
      type: `PUT`,
      data: {
        devoured: state,
        date_eaten: `NOW()` // meh, leave it for now
      }
    }).then(() => {
      console.log(`burger updated!`)
      // Reload the page to get the updated list
      location.reload()
    }
    )
  }
})
