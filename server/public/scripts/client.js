console.log( 'JS Loaded');

$( document ).ready(function(){
    console.log( 'JQ loaded' );
    $('#submitBtn').on('click', function(event){
        event.preventDefault();
        handleNewTask();
    });
    getTasks();
    //$('#completedBtn').on('click', completedTask());
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

        if(task.completed === true ){
            compStatus = 'Completed';
        } else if(task.completed === false ){
            compStatus = 'Incomplete'
        }

        let row = $(`
            <tr data-id=${task.id}>
                <td id="taskDisplay">${task.task}</td>
                <td>${task.due_date}</td>
                <td>${task.priority}</td>
                <td>${compStatus}</td>
                <td><button class="completedBtn">Completed</button></td>
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

// function completedTask() {
//     console.log('clicked');
   
//     let id = $(this).closest('tr').data('id');
    
//     console.log(id);
  
//       $.ajax({
//           url: `/tasks/${id}`,//just like delete!
//           method: 'PUT',
//           data: {id: id}//just like POST!
//       }).then(function (response) {
//           console.log('updated!');
//           getTasks();//so DOM updates after delete (ie new render)!
  
//       }).catch(function (err) {
//           console.log(err);
  
//       })
//   }

  