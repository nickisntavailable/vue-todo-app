<template>
    <div class="content">
        <div class="card">
            <div class="header">
                {{ todo.taskName }}
            </div>
            <div class='meta'>
                    <ul>
                        <li v-for="(task, index) in todo.tasks" v-if="index < 2" :key="task.title">
                            <i
                                v-bind:class="{'fa fa-circle': task.done, 'fa fa-circle-o': !task.done}"

                            ></i>
                            <span
                                :class="{strike: task.done}"
                            >{{ task.title }}</span>
                        </li>
                    </ul>
                    <p v-if="todo.tasks.length > 2">...</p>
            </div>
            <div class="buttons">
                <button>
                    <router-link :to="{name: 'task', params: {todo: todo} } " >Change</router-link>
                </button>
                <button @click="deleteTodo">Delete</button>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
  export default {
    props: ['todo'],
    data() {
      return {
        isEditing: false,
      };
    },
    methods: {
      
      deleteTodo(todo) {
        this.$emit('delete-todo', todo);
      },
      showForm() {
        this.isEditing = true;
      },
      hideForm() {
        this.isEditing = false;
      },
    },
  };
</script>

<style>
@import "../../node_modules/font-awesome/css/font-awesome.css";

.card {
    box-sizing: border-box;
    width: 300px;
    min-height: 100px;
    margin: 0 auto;
    margin-bottom: 30px;
    border: 1px solid grey;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

}

.card .header {
    flex-basis: 20px;
    flex-shrink: 0;
}

.card .meta {
    flex-grow: 1;
    margin-bottom: 10px;
}

.card .meta ul {
    list-style: none;
    padding: 0;
    padding-left: 10px;
    margin: 0;
    margin-top: 10px;
    color: grey;
}
.card .meta p {
    color: grey;
    margin: 0;
    padding: 0;
    padding-left: 10px;
    margin-bottom: 5px;
}

.card .buttons {
    flex-basis: 30px;
    flex-shrink: 0;
    width: 100%;
    display: flex;
}

.card .buttons :first-child {
    border-radius: 10px 0 0 10px;
    border-right: none;
}
.card .buttons :last-child {
    border-radius: 0 10px 10px 0;
}

.card .buttons button {
    width: 50%;
    border: 0.5px solid grey;
    background: #fff;
    outline: none;
}

</style>