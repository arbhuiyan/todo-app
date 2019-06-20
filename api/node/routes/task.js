const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');
const { checkSchema } = require('express-validator/check');
const { validationResult } = require('express-validator/check');

/* GET List Tasks. */
router.get('/',  taskController.list );
/* GET Task. */
router.get('/:id',  taskController.find );
/* GET List Tasks by state. */
router.get('/states/:state',  taskController.findByState );
/* POST create Task */
router.post(
  '/',
  checkSchema({
    task: {
      exists: {
        options: {
          checkNull: true
        },
        errorMessage: "Is required"
      },
      trim: true
    },
    description: {
      exists: {
        options: {
          checkNull: true
        },
        errorMessage: "Is required"
      },
      trim: true
    },
    priority: {
      exists: {
        options: {
          checkNull: true
        },
        errorMessage: "Is required"
      },
      isNumeric: {
        errorMessage: "Must be numeric"
      }
    }
  }), 
  validate,
  taskController.add
);
/* PUT Update Task */
router.put('/:id', taskController.edit );
/* DELETE Task */
router.delete('/:id', taskController.delete );

/* RUN Validation on request */
function validate(req,res,next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}
module.exports = router;