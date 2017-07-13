const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');

var application = express();
application.engine('mustache', mustache());


application.set('views', './views');
application.set('view engine', 'mustache');

application.use(express.static(__dirname + '/public'));
application.use(bodyParser.urlencoded({ extended: false }));

var todos = [];

var complete = [];

application.post("/:completeId", (request, response) =>{
    var item = request.params.completeId;
    for( var i = 0; i< todos.length; i++) {
        if (todos[i] === item) {
            todos.splice(i, 1);
            complete.push(item);
        }
    }
    response.redirect('/')

});

application.get('/',(request, response) =>{
    response.render('index', { todos: todos, complete: complete });
});

application.post("/", (request, response) => {
    todos.push(request.body.todo)
    response.redirect('/');

});

application.listen(3000, function () {
    console.log('It works!');
});
