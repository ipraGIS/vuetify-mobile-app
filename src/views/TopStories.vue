<template>

  <!-- <v-container>
    <h1 class="headline">Top Stories</h1>
    Content is coming to this mobile app very soon!
  </v-container> -->
  <div>
    <NewsList :newsArticles="newsArticles"></NewsList>
  </div>

</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import newsService from '../services/newsService';
import NewsList from '../components/NewsList.vue';
  import { ArticleType, NewsArticle } from '../types';
  @Component({
    components: {
      NewsList
    }
  })
  export default class TopStories extends Vue {
    newsArticles: NewsArticle[] = [];
    mounted() {
      console.log(1111111);
      newsService.getArticlesByType(ArticleType.TopStory)
        .then((newsArticles: NewsArticle[]) => {
          console.log(newsArticles);
          this.newsArticles = newsArticles;
        });
    }
  }
</script>
