const express = require(`express`);
const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require(`../../models/burger.js`);

// Create all our routes and set up logic within those routes where required.
router.get(`/`, function (req, res) {
  burger.all(function (data) {
    // console.log(`sending all object: `,hbsObject);
    res.render(`index`, { burgers: data })
  })
})

router.put(`/api/burgers/:id`, (req, res) => {
  const condition = `id = ` + req.params.id;

  burger.update(req.body, condition, result => {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end()
    } else {
      res.status(200).end()
    }
  });
});


// Export routes for server.js to use.
module.exports = router
