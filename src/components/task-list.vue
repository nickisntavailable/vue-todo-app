<template>
    <div>
        <task 
            v-bind:todo="todo"
            v-on:delete-task="deleteTask"
            v-on:complete-task="completeTask"
            v-on:change-task="changeTask"
            v-on:edit-task="editTask"
            v-on:edit-title="editTitle"
            v-on:change-title="changeTitle"
        ></task>
    </div>
</template>




<script>
import Task from './task.vue';


export default {
    components: {
        Task,
    },
    props: ['todo'],
    methods: {
        deleteTask(todo, taskText) {
             this.todo.tasks = this.todo.tasks.filter(task => {
                return task.title !== taskText;
            });
            this.saveTodos();
        },
        completeTask(todo, taskText) {
            this.todo.tasks =  this.todo.tasks.map(task => {
                if(task.title === taskText) {
                task.done = !task.done;
                }
                return task;
            });
            this.saveTodos();
        },
        changeTask(todo, taskText) {
            this.todo.tasks = this.todo.tasks.map(task => {
                if(task.title === taskText) {
                task.isEditing = !task.isEditing;
                }
                return task;
            })
        },
        changeTitle(todo) {
            this.todo.isEditing = !this.todo.isEditing;
        },
        editTask(todo, taskText, editValue) {
            this.todo.tasks = this.todo.tasks.map(task => {
                if(task.title === taskText) {
                    task.title = editValue;
                    task.isEditing = !task.isEditing;
                }
                return task;
            });
            this.saveTodos();
        },
        editTitle(todo, taskText, editValue) {
            this.todo.taskName = editValue;
            this.todo.isEditing = !this.todo.isEditing;
            this.saveTodos();
        },
        saveTodos() {
            let todos;
            if (localStorage.getItem('todos')) {
                try {
                    todos = JSON.parse(localStorage.getItem('todos'));
                } catch(e) {
                    localStorage.removeItem('todos');
                }
            }
            todos = todos.map(todo => {
                if(todo.id === this.todo.id) {
                    todo = this.todo;
                }
                return todo;
            });
            const parsed = JSON.stringify(todos);
            localStorage.setItem('todos', parsed);
        }
    },
}


</script>


<style>



</style>