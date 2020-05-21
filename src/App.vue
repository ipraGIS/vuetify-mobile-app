<template>
  <v-app>
    <MapViewer></MapViewer>
    <TopToolbar></TopToolbar>
    <!-- <NewsList></NewsList> -->
    <v-content>
      <router-view></router-view>
    </v-content>
    <BottomNav></BottomNav>
  </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import TopToolbar from './components/TopToolbar.vue';
  import BottomNav from './components/BottomNav.vue';
  import MapViewer from './components/MapViewer.vue';
  // import NewList from './components/NewsList.vue';
  @Component({
    components: {
      TopToolbar,
      BottomNav,
      MapViewer,
      // NewList
    }
  })
  export default class extends Vue {
  }
</script>
