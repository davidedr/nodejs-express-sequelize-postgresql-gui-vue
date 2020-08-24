<template>
  <div>
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
    <b-table hover :items="tutorials">
      <template v-slot:cell(published)="row">
        <b-badge v-if="row.item.published" variant="true">Published</b-badge>
        <b-badge v-else variant="false">Not Published</b-badge>
      </template>
      <template v-slot:cell(name)="data">
        <router-link v-bind:to="`${data.index}`">{{ data.value }}</router-link>
      </template>
    </b-table>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  data() {
    return {
      tutorials: []
    };
  },
  methods: {
    retrieveTutorials() {
      TutorialDataService.getAll()
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.retrieveTutorials();
  }

};
</script>