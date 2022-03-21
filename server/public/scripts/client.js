console.log('JS Loaded');

$(document).ready(function () {
    console.log('JQ loaded');
    $('#submitBtn').on('click', function (event) {
        event.preventDefault();
        handleNewTask();
    });
    getTasks();
    $('#viewTasks').on('click', '.completedBtn', completedTask);
    $('#viewTasks').on('click', '.deleteBtn', deleteTask);
    // $('.deleteBtn').on('click', function(){
    //     $('#deletemodal').modal('show');
    // })
});

function handleNewTask() {

    let valTask = $('#newTask').val();
    let valDate = $('#dueDate').val();

    validateTask( valTask, valDate );

    const newTask = {
        task: $('#newTask').val(),
        description: $('#newDescription').val(),
        due_date: $('#dueDate').val()
    };
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    }).then(function (response) {
        $('#newTask').val(''),
            $('#newDescription').val(''),
            $('#dueDate').val('')
        //console.log( 'response from client', response );
        getTasks();
    }).catch(function (error) {
        //console.log( `Error in Post`, error );
        alert('Unable to add tasks via client js')
    })
}

function validateTask( task, date ) {
    if (task === "" || date === "" ) {
        alert("Required Data is missing")
    };
}

function getTasks() {
    console.log('inside of getTasks');

    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        //console.log(response);
        renderTasks(response);
    }).catch(function (error) {
        console.log('error in GET', error);
    })
};

function renderTasks(tasks) {
    $('#viewTasks').empty();
    let status = '';
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        if (task.completed === true) {
            compStatus = 'Completed';
        } else if (task.completed === false) {
            compStatus = 'Incomplete'
        };
        // set date to red if Late
        if (task.late === true ) {
            status = 'lateStatus'
        } else if (task.late === false ){
            status = 'earlyStatus'
        }

        if (task.completed === false && task.description !== "") {
            let row = $(`
                <tr data-id=${task.id}>
                    <td id="taskDisplay">${task.task}</td>
                    <td class=${status}>${task.due_date}</td>
                    <td>${compStatus}</td>
                    <td><button class="completedBtn btn btn-success btn-sm" data-id=${task.id} data-completed=${task.completed}>Completed</button></td>
                    <td><button class="deleteBtn btn btn-danger btn-sm" >Remove task</button></td>
                </tr>
                <tr class="longDescription">
                    <td>${task.description}</td>
                </tr>
            `);
            row.data('task', task)
            $('#viewTasks').append(row);
        } else if (task.completed === false && task.description === "") {
            let row = $(`
                <tr data-id=${task.id}>
                    <td id="taskDisplay">${task.task}</td>
                    <td class=${status}>${task.due_date}</td>
                    <td>${compStatus}</td>
                    <td><button class="completedBtn btn btn-success btn-sm" data-id=${task.id} data-completed=${task.completed}>Completed</button></td>
                    <td><button class="deleteBtn btn btn-danger btn-sm" >Remove task</button></td>
                </tr>
            `);
            row.data('task', task)
            $('#viewTasks').append(row);
        } else if (task.completed === true && task.description !== "") {
            let row = $(`
                <tr data-id=${task.id} class="bg-secondary bg-gradient">
                    <td id="taskDisplay">${task.task}</td>
                    <td class=${status}>${task.due_date}</td>
                    <td>${compStatus}</td>
                    <td><button class="completedBtn btn btn-success btn-sm" data-id=${task.id} data-completed=${task.completed}>Completed</button></td>
                    <td><button class="deleteBtn btn btn-danger btn-sm" >Remove task</button></td>
                </tr>
                <tr class="bg-secondary bg-gradient bg-opacity-75 longDescription">
                    <td>${task.description}</td>
                </tr>
            `);
            row.data('task', task)
            $('#viewTasks').append(row);
        } else if (task.completed === true && task.description === "") {
            let row = $(`
                <tr data-id=${task.id} class="bg-secondary bg-gradient">
                    <td id="taskDisplay">${task.task}</td>
                    <td class=${status}>${task.due_date}</td>
                    <td>${compStatus}</td>
                    <td><button class="completedBtn btn btn-success btn-sm" data-id=${task.id} data-completed=${task.completed}>Completed</button></td>
                    <td><button class="deleteBtn btn btn-danger btn-sm" >Remove task</button></td>
                </tr>
            `);
            row.data('task', task)
            $('#viewTasks').append(row);
        }
    };
}

function completedTask() {
    // id needs to be a data element in the target
    // make sure you also have the target properly chained in the listener
    // the data you request needs a corresponding data entry example: data-completed, data-id
    const id = $(this).data('id');
    // const completeStatus = $( this ).data( 'completed' );
    //console.log( 'inside completedTask', id );
    $.ajax({
        url: `/tasks/${id}`,//just like delete!
        type: 'PUT',
        data: { id: id }//just like POST!
    }).then(function (response) {
        console.log('updated!');
        getTasks();
    }).catch(function (err) {
        console.log(err);
    })
}

function deleteTask() {
    let id = $(this).closest('tr').data('id');
    console.log('inside deleteTask', id);
    $.ajax({
        url: `/tasks/${id}`,
        method: 'DELETE'
    }).then(function (response) {
        getTasks();
    }).catch(function (err) {
        console.log(err);
    });
}




