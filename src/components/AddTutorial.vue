<template>
  <div class="submit-form">
    <h1>Add Tutorial</h1>
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title:</label>
        <input 
          v-model="tutorial.title"
          id="title"
          type="text"
          required
          class="form-control"
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <input 
          v-model="tutorial.description"
          id="description"
          type="text"
          required
          class="form-control"
          name="description"
        />
      </div>
      <button v-on:click="saveTutorial" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>Tutorial submitted successfully!</h4>
      <button class="btn btn-success" v-on:click="resetFormFields">Add</button>
    </div>
  </div>
</template>

<script>
import TutorialDataService from '../services/TutorialDataService';
  //import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      submitted: false,
      tutorial: {
        id: null,
        title: "",
        description: "",
        published: false
      }
    };
  },
  methods: {
    saveTutorial() {
      var data={
        title: this.tutorial.title,
        description: this.tutorial.description,
      };
      TutorialDataService.create(data)
        .then(response => { this.tutorial.id=response.data.id; this.submitted=true; })
        .catch(error => { console.log(error); })
    },
    resetFormFields() {
      this.submitted=false;
      this.tutorial={};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>