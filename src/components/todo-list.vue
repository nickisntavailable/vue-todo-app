<template>
  <div class="todo-list">
    <h2 v-if="todos.length == 0">No Todos yet! Click + button below</h2>
    <todo v-else v-on:delete-todo="deleteTodo" v-for="todo in todos" :todo.sync="todo" :key="todo.taskName"></todo>
    <create-todo v-on:create-todo="createTodo"></create-todo>
  </div>
</template>

<script type = "text/javascript" >
import sweetalert from 'sweetalert';
import Todo from './todo.vue';
import CreateTodo from './createTodo.vue';

export default {
  props: ['todos'],
  components: {
    Todo,
    CreateTodo,
  },
  mounted() {
    if (localStorage.getItem('todos')) {
        try {
            this.todos = JSON.parse(localStorage.getItem('todos'));
        } catch(e) {
            localStorage.removeItem('todos');
        }
    }
  },
  methods: {
    createTodo(newTodo) {
        this.todos.push(newTodo);
        this.saveTodos();
    },
    deleteTodo(todo) {
        sweetalert({
            title: 'Are you sure?',
            text: 'This To-Do will be permanently deleted!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        })
        .then ((willDelete) => {
            if(willDelete) {
                sweetalert({
                    title: 'Poof! Your imaginary file has been deleted!',
                    icon: "success",
                });
                const todoIndex = this.todos.indexOf(todo);
                this.todos.splice(todoIndex, 1);
                this.saveTodos();
            }
        });
        
        
    },
    saveTodos() {
        const parsed = JSON.stringify(this.todos);
        localStorage.setItem('todos', parsed);
    }
  },
};
</script>

<style scoped>

.todo-list h2{
    text-align: center;
    font-size: 20px;
    color: grey;
}
</style>