console.log( 'JS Loaded');

$( document ).ready(function(){
    console.log( 'JQ loaded' );
    $('#submitBtn').on('click', function(event){
        event.preventDefault();
        handleNewTask();
    });
    getTasks();
});

// let m = moment();
// console.log(`toString() => ${m.toString()}`);

function handleNewTask(){
    const newTask = {
        task: $('#newTask').val(),
        description: $('#newDescription').val(),
        due_date: $('#dueDate').val()
    };

    console.log( `inside of submit button`, newTask );

    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    }).then(function(response){
        console.log( 'response from client', response );
        getTasks();
    }).catch(function(error){
        console.log( `Error in Post`, error );
        alert('Unable to add tasks via client js')
    })
}

function getTasks(){
    console.log( 'inside of getTasks' );

    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function(response) {
        console.log(response);
        renderTasks(response);
    }).catch(function(error){
        console.log('error in GET', error);
    })
};

function renderTasks(tasks){
    $('#viewTasks').empty();
    
    console.log( 'inside of renderTasks' );
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

        let row = $(`
            <tr data-id=${task.id}>
                <td id="taskDisplay">${task.task}</td>
                <td>${task.due_date}</td>
                <td>${task.priority}</td>
                <td><button class="deleteBtn" >Remove task</button></td>
            </tr>
            <tr>
                <td>${task.description}</td>
            </tr>
        `);
        row.data('task', task)
        $('#viewTasks').append(row);
        console.log(row.data('task'));    
    };
}