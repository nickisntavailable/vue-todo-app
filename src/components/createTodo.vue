<template>
    <div class="content">
        <button v-show="!isCreating" @click="openForm">
            <i class="fa fa-plus" aria-hidden="true"></i>
        </button>

        <div class="card create" v-show="isCreating">
            <div class="header">
                <label>Title</label>
                <input v-model="titleText" type='text'>
            </div>
            <div class="meta">
                <label>Todo</label>
                <div class="meta__container" v-for="(task, index) in tasks" :key="index">
                    <input  v-model="tasks[index].title" type='text'>
                    <i class="fa fa-times" 
                        @click="deleteTask(index)"
                        v-show="tasks.length > 1"
                    ></i>
                </div>
                
            </div>
            <div class="add">
                <button>
                    <i class="fa fa-plus" @click="addTask"></i>
                </button>
            </div>
            <div class="buttons">
                <button v-on:click="sendForm()">Create</button>
                <button v-on:click="closeForm">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      titleText: '',
      tasks: [{
          title: '',
          done: false,
          isEditing: false
      }],
      isCreating: false,
    };
  },
  methods: {
    openForm() {
      this.isCreating = true;
    },
    closeForm() {
      this.isCreating = false;
    },
    sendForm() {


        this.tasks = this.tasks.filter(task => {
            return task.title !== ''
        });
        if(this.tasks.length)
        if (this.titleText.length > 0) {
            const taskName = this.titleText;
            const tasks = this.tasks;

            this.$emit('create-todo', {
              taskName,
              tasks,
            });
            this.titleText = '';
            this.tasks = [{
                title: '',
                done: false,
                isEditing: false
            }];
            this.isCreating = false;
      }
    },
    addTask() {

        this.tasks = this.tasks.concat({
            title: '',
            done: false,
            isEditing: false
        });
    },
    deleteTask(index) {
        this.tasks.splice(index, 1);
    }
  },
};
</script>

<style>

* {
    box-sizing: border-box;
}

.content {
    margin: 0 auto;
    display: flex;
    justify-content: center;
}

.content .card.create {
    min-height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.content .card.create .header,
.content .card.create .meta {
    width: 100%;
    min-height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.content .card.create .header input {
    width: 100%;
    height: 21px;
    margin-bottom: 10px;
}


.content .card.create .meta .meta__container {
    width: 100%;
    
    display: flex;
    align-items: center;
}
.content .card.create .meta .meta__container i {
    font-size: 24px;
    flex-basis: 24px;
    flex-shrink: 0;
    padding-left: 6px;
    margin-bottom: 10px;
}

.content .card.create .meta .meta__container input {
    flex: 1;
    height: 21px;
    margin-bottom: 10px;
}

.content .card.create .add {
    margin-bottom: 15px;
}
</style>