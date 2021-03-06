// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(() => {
  const leftCol = $(`#left-side-ul`)[0]
  const rightCol = $(`#right-side-ul`)[0]
  let confirmsAre = $(`#disable-devour-alerts`).data(`alerts`)
  let activeButtonsPrimary = $()
  let activeButtonsSecondary = $()

  if (confirmsAre === `disabled`) {
    $(`#disable-devour-alerts`).attr(`class`, `p-2 fa fa-toggle-off`)
  } else {
    $(`#disable-devour-alerts`).attr(`class`, `p-2 fa fa-toggle-on`)
  }

  const nameChangesData = {}

  // Move Cursor to End of Input
  // Where el is a reference to an input or textarea.
  const moveCursorToEnd = el => {
    if (typeof el.selectionStart == "number") {
      el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
      el.focus();
      var range = el.createTextRange();
      range.collapse(false);
      range.select();
    }
  }

  const resetPrimary = () => {
    activeButtonsPrimary.show()
    activeButtonsSecondary.hide()
  }

  $(`#disable-devour-alerts`).on(`click`, e => {
    // if(confirmsAre = false){
    // const cfm = confirm(`Enable alerts for devoured buttons?`)
    const change = { enabled: `` }

    if ($(`#disable-devour-alerts`).data(`alerts`) === `enabled`) {
      change.enabled = false
    } else {
      change.enabled = true

    }

    $.ajax(`/api/confirmations/` + 1, {
      type: `PUT`,
      data: change
    }).then(
      function () {
        // Reload the page to get the updated list
        location.reload()
      }
    )
  })

  // if no list items in "burgers to eat" display message
  if (leftCol.children.length === 0) {
    leftCol.innerHTML = `<p class="p-2" style="text-align: center; color: #3F012C; font-weight: 700;">Nothing here. See form below.</p>`
    // console.log($(`#left-side-ul`))
  }

  // if no list items in "devoured burgers" display message
  if (rightCol.children.length === 0) {
    $(`#alerts-confirmation`).hide()
    rightCol.innerHTML = `<p class="p-2" style="text-align: center; color: #3F012C; font-weight: 700;">Nothing devoured. Enter a burger below to begin.</p>`
  }

  const dothething = e => {
    e.preventDefault()
    let burgerID = $(e.target).data(`id`)

    const infoList = $(`.devoured-info`)

    if ($(e.target).data(`name`) === `morebutton`) {
      for (let i = 0; i < infoList.length; i++) {

        if ($(infoList[i]).data(`id`) === $(e.target).data(`id`)) {

          if ($(infoList[i].children[1].children[0]).attr(`style`) === `display: none;`) {
            resetPrimary()
            activeButtonsPrimary = $(infoList[i].children[0])
            activeButtonsSecondary = $(infoList[i].children[1].children[0])
            // console.log(activeButtons)
            $(infoList[i].children[0]).hide()
            $(infoList[i].children[1].children[0]).show()

          } else {
            // console.log($(infoList[i].children[1].children[0]))
            $(infoList[i].children[0]).show()
            $(infoList[i].children[1].children[0]).hide()

          }

        }

      }
    }

    if ($(e.target).data(`isbutton`)) {
      switch ($(e.target).data(`typeofbutton`)) {
        case `edit`:
          let brg = $(`.undevoured-burger-names[data-id="${burgerID}"]`)[0]
          let ogBrgName = brg.value
          const editSaveBtn = $(e.target)

          $(brg).attr(`readonly`, false).attr(`style`, `background: white; color: black;`).focus()
          moveCursorToEnd(brg)
          $(editSaveBtn).attr(`class`, `fa fa-save`)

          $(editSaveBtn).on(`click`, (e) => {
            e.preventDefault()
            if(!$(brg).context.readOnly){
              updateBurgerName(burgerID, $(brg).context.value)
            }
          })
          $(window).on(`click`, event => {
            event.preventDefault()
            if ($(event.target).data(`id`) !== burgerID) {
              console.log(`this is NOT of the burger`)
              resetPrimary()
              $(editSaveBtn).attr(`class`, `fa fa-edit`)
              $(brg).attr(`readonly`, true).attr(`style`, ``)
              $(brg).context.value = ogBrgName
              $(window).unbind()
              return
            } 
            
          })
          break
        case `save`:
          console.log(`saving stuff`)
          break
        case `add`:
          // let confirm = 
          if (confirmsAre === `disabled` || confirm(`This will add the devoured burger to "burgers to eat" list`) === true) {
            updateDevour($(e.target).data(`id`), 0)
          }
          break
        case `delete`:
          if (confirmsAre === `disabled` || confirm(`This will delete this burger`) === true) {
            // Send the DELETE request - passing id as parameter
            deleteBurger($(e.target).data(`id`))
          }
          break

        default:
          break
      }
    }
  }

  $(rightCol).on(`click`, e => {
    dothething(e)

  })
  $(leftCol).on(`click`, e => {
    dothething(e)
  })
  activeButtonsPrimary.focusout(e => {
    console.log(e, `focus out`)
  })
  activeButtonsSecondary.on(`focusout`, e => {
    console.log(e, `focus out`)
  })

  $(`.undevoured-burger-names`).on(`focusout`, e => {
    // console.log(e, `focus out`)
  })

  // $(`.undevoured-burger-names`).on(`focusin`, e => {
  //   console.log($(e.target).data(`id`))
  //   console.log($(e.target).context.value)
  // })

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
      $(`#burger`).val(``)
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

  const updateBurgerName = (id, name) => {
    console.log(`going to update id# ${id} with new name: ${name}`)
    // Send the PUT request.
    $.ajax(`/api/burgers/` + id, {
      type: `PUT`,
      data: {
        burger_name: name
      }
    }).then(() => {
      console.log(`burger updated!`)
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
