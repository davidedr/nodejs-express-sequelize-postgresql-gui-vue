<template>
  <div v-if="currentTutorial" class="edit-form">
    <h1>Tutorial</h1>
    <form>
      <div class="form-group">
        <label for="title">Title</label>  
        <input type="text" class="from-control" id="title" v-model="currentTutorial.title"/>
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <input type="text" class="from-control" id="description" v-model="currentTutorial.description"/>
      </div>
      <div class="form-group">
        <label><strong>Status:</strong></label>{{ currentTutorial.published? "Published": "Pending" }}
      </div>        
    </form>
    <button
      v-if="currentTutorial.published"
      class="badge badge-primary mr-2"
      v-on:click="updatePublished(false)">Unpublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      v-on:click="updatePublished(true)">Publish
    </button>
    <button
      v-on:click="deleteTutorial">Delete
    </button>
    <button
      type="submit"
      v-on:click="updateTutorial">Update
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else><br/><p>Please click on a Tutorial...</p></div>
</template>

<script>
  import TutorialDataService from '../services/TutorialDataService';
  export default {
    name: "tutorial",
    data() {
      return {
        currentTutorial: null,
        message: ""
      };
    },
    methods: {
      getTutorial(id) {
        TutorialDataService.get(id)
          .then(response => { this.currentTutorial=response.data; console.log("getTutorial"); console.log(response.data); })
          .catch(err => { console.log("getTutorial"); console.log(err); })

      },
      updatePublished(status) {
        var data = {
          id: this.currentTutorial.id,
          title: this.currentTutorial.title,
          description: this.currentTutorial.description,
          published: status
        }
        TutorialDataService.update(this.currentTutorial.id, data)
          .then(response => { this.currentTutorial.published = status; console.log("updatePublished"); console.log(response.data); })
          .catch(err => { console.log("updatePublished"); console.log(err); })

      },
      updateTutorial() {
        TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
          .then(response => { this.message = 'The tutorial was updated successfully!'; console.log("updateTutorial"); console.log(response.data); })
          .catch(err => { console.log("updateTutorial"); console.log(err); })

      },
      deleteTutorial() {
        TutorialDataService.delete(this.tutorial.id)
          .then(response => { this.$router.push({ name: "tutorials" }); console.log("deleteTutorial"); console.log(response.data); })
          .catch(err => { console.log("deleteTutorial"); console.log(err); })

      }
    },
    mounted() {
      this.message="";
      this.getTutorial(this.$route.params.id);
    }
  };
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>