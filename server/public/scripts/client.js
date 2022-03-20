console.log( 'JS Loaded');

$( document ).ready(function(){
    console.log( 'JQ loaded' );
    $('#submitBtn').on('click', function(event){
        event.preventDefault();
        handleNewTask();
    });
    getTasks();
    $('#viewTasks').on('click', '.completedBtn', completedTask);
    $('#viewTasks').on('click', '.deleteBtn', deleteTask);
});

// let m = moment();
// console.log(`toString() => ${m.toString()}`);

function handleNewTask(){
    const newTask = {
        task: $('#newTask').val(),
        description: $('#newDescription').val(),
        due_date: $('#dueDate').val()
    };

    //console.log( `inside of submit button`, newTask );

    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    }).then(function(response){
        //console.log( 'response from client', response );
        getTasks();
    }).catch(function(error){
        //console.log( `Error in Post`, error );
        alert('Unable to add tasks via client js')
    })
}

function getTasks(){
    console.log( 'inside of getTasks' );

    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function(response) {
        //console.log(response);
        renderTasks(response);
        renderModalDescriptions(response);
    }).catch(function(error){
        console.log('error in GET', error);
    })
};

function renderTasks(tasks){
    $('#viewTasks').empty();
    
    //console.log( 'inside of renderTasks' );
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

        if(task.completed === true ){
            compStatus = 'Completed';
        } else if(task.completed === false ){
            compStatus = 'Incomplete'
        }
// Remove for now as both complete and delete are not required
// Revisit later during stretch

// Add priority during stretch
// <td>${task.priority}</td>
// legacy code, display for task description
/* <tr>
<td>${task.description}</td>
</tr> */
        if( task.completed === false ){
            let row = $(`
                <tr data-id=${task.id}>
                    <td id="taskDisplay">${task.task}<button type="button" class="detail-btn btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button></td>
                    <td>${task.due_date}</td>
                    <td>${compStatus}</td>
                    <td><button class="completedBtn" data-id=${task.id} data-completed=${task.completed}>Completed</button></td>
                    <td><button class="deleteBtn" >Remove task</button></td>
                </tr>

            `);
            row.data('task', task)
            $('#viewTasks').append(row);
        } else if ( task.completed === true  ) {
            let row = $(`
                <tr data-id=${task.id} class="bg-secondary bg-gradient">
                    <td id="taskDisplay">${task.task}</td>
                    <td>${task.due_date}</td>
                    <td>${compStatus}</td>
                    <td><button class="completedBtn" data-id=${task.id} data-completed=${task.completed}>Completed</button></td>
                    <td><button class="deleteBtn" >Remove task</button></td>
                </tr>
            `);
            row.data('task', task)
            $('#viewTasks').append(row);
        }  
    };
}

function renderModalDescriptions(tasks){
    console.log( 'inside of Modal');
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

        if ( task.description !== "" ){
            let rowDesc = $(`
            <div class="modal fade" id="${task.id}descModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title">Task Details</h3>
                        </div>
                        <div class="modal-body">
                            <p>${task.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            `);
           // row.data('task', task)
            $('.descriptionData').append(rowDesc);
        }
    }
}

function test(){
    console.log( 'inside of test' );
}

function completedTask(){
    // id needs to be a data element in the target
    // make sure you also have the target properly chained in the listener
    // the data you request needs a corresponding data entry example: data-completed, data-id
    const id = $( this ).data('id');
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

function deleteTask(){
    let id = $(this).closest('tr').data('id');
    console.log( 'inside deleteTask', id );
    $.ajax({
        url: `/tasks/${id}`,
        method: 'DELETE'
    }).then( function ( response ){
        getTasks();
    }).catch(function (err){
        console.log( err );
    });
}

  
