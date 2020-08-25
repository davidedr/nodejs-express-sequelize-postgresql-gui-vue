<template>
  <div>
    <h1>Tutorials Search</h1>
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="serch by Title" v-model="searchTitle" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" v-on:click="searchTutorialsByTitle">
            Search
          </button>          
        </div>
      </div>
    </div>
    <h1>Tutorials List</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Title</th>
          <th scope="col">Published</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tutorial, index) in tutorials" :key="index">
          <td>{{ tutorial.id }}</td>
          <td>{{ tutorial.title }}</td>
          <td style="text-align: center vertical-align: middle">
            <input type="checkbox" v-model="tutorial.published">
          </td>
        </tr>
      </tbody>
    </table>
    <h1>Tutorials List, again</h1>    
    <b-table hover :items="tutorials">
      <template v-slot:cell(published)="row">
        <b-badge v-if="row.item.published" variant="true">Published</b-badge>
        <b-badge v-else variant="false">Not Published</b-badge>
      </template>
      <template v-slot:cell(name)="data">
        <router-link v-bind:to="`${data.index}`">{{ data.value }}</router-link>
      </template>
    </b-table>
    <div class="col-md-6">
      <h1>Tutorials List and again</h1>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index==currentIndex}"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          v-on:click="setActiveTutorial(tutorial, index)">
          {{ tutorial.title }}
        </li >
      </ul>
      <button class="m-3 btn btn-sm btn-danger" v-on:click="removeAllTutorials" :class=" {active: this.tutorials.length>0 }">Remove All</button>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>Current Tutorial</h4>
        <div>
          <label><strong>Title:</strong></label>{{ currentTutorial.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label>{{ currentTutorial.description }}
        </div>
        <div>
          <label><strong>Published:</strong></label>{{ currentTutorial.published? "Published": "Pending" }}
        </div>
        <a class="badge badge-warining" v-bind:href="`/tutorials/`+currentTutorial.id">Edit</a>
      </div>
      <div v-else>
        <br/>
        <p>Please click on a tutorial...</p>
      </div>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  data() {
    return {
      tutorials: [],
      searchTitle: '',
      currentTutorial: null,
      currentIndex: 0
    };
  },
  methods: {
    retrieveTutorials() {
      TutorialDataService.getAll()
        .then(response => {
          this.tutorials = response.data;

          console.log("retrieveTutorials:");
          console.log(response.data);
        })
        .catch(err => {
          console.log("retrieveTutorials:");
          console.log(err);
        });
    },
    searchTutorialsByTitle() {
      TutorialDataService.findByTitle(this.searchTitle)
        .then(response => {
          this.tutorials = response.data;

          console.log("searchTutorialsByTitle:");
          console.log(response.data);
        })
        .catch(err => {
          console.log("searchTutorialsByTitle:");
          console.log(err);
        })

    },
    setActiveTutorial(index) {
      this.currentIndex=this.tutorials[index];
      this.currentIndex=index;

    },
    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then(response => {
          console.log("removeAllTutorials:");
          console.log(response.data);
          this.refreshList();
        })
        .catch(err => {
          console.log("removeAllTutorials:");
          console.log(err)
        })
    },
    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial=null;
      this.currentIndex=-1;
    }
  },
  mounted() {
    this.retrieveTutorials();
  }

};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>