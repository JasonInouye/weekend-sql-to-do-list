console.log( 'JS Loaded');

$( document ).ready(function(){
    console.log( 'JQ loaded' );
    getTasks();
});

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
                <td>${task.task}</td>
                <td>${task.description}</td>
                <td>${task.date}</td>
                <td>${task.priority}</td>
                <td><button class="deleteBtn" >Remove task</button></td>
            </tr>
        `);
        row.data('task', task)
        $('#viewTasks').append(row);
        console.log(row.data('task'));    
    };
}