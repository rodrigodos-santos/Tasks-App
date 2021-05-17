const Tasks = require('./tasks')

Tasks.methods(['get', 'post', 'put', 'delete'])
Tasks.updateOptions({new: true, runValidators: true})

module.exports = Tasks