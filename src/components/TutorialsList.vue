<template>
  <h1>Tutorials List</h1>
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