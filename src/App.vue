<template>
  <div id="app">
    <!-- <task-list v-bind:todo="todos[0]"></task-list> -->
    <!-- <todo-list v-bind:todos="todos"></todo-list> -->
    <router-view v-bind:todos="todos"/>
  </div>
</template>

<script>

import TaskList from './components/task-list.vue';
import TodoList from './components/todo-list.vue';

export default {
  name: 'App',
  components: {
    TaskList,
    TodoList,
  },
  data() {
    return {
      todos: [
         
      ]
    };
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
    saveTodos() {
      const parsed = JSON.stringify(this.todos);
      localStorage.setItem('todos', parsed);
    }
  }
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
