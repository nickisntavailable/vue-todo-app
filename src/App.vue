<template>
  <div id="app">
    <h1>{{appName}}</h1>
    <router-view v-bind:todos="todos"/>
  </div>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      appName: 'Simple ToDo App',
      todos: [ 
      ]
    };
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

#app h1 {
  font-family: 'Permanent Marker', cursive;
  font-size: 50px;
  text-align: center;
  font-weight: 900;
  color: rgba(96, 49, 228, 0.15);
  margin-bottom: 20px;
}
</style>
