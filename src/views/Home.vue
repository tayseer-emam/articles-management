<template>
  <div class="home row wrap">
    <div v-if="!articles.length" class="col-sm-12">
      <div class="alert alert-info" role="alert">There is no articles to see</div>
    </div>    
    <div v-for="article of articles" :key="article.id" class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
      <div class="card mb-4">
        <img :src="article.image" class="card-img-top" :alt="article.title">
        <div class="card-body">
          <h5 class="card-title text-truncate-two-lines">{{ article.title }}</h5>
          <p class="card-text text-truncate">{{ article.content | clean }}</p>
          <p class="card-text"><small class="text-muted">{{ article.date }}</small></p>
          <router-link :to="{ name: 'article-view', params: { id: article.id } }" class="btn btn-primary">View</router-link>
          <router-link :to="{ name: 'edit-article', params: { id: article.id } }" class="btn btn-outline-secondary ml-2" v-if="user.id === article.ownerId">Edit</router-link>
          <button @click="deleteArticle(article.id)" class="btn btn-link text-danger ml-2" v-if="user.id === article.ownerId">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticlesService from '@/services/ArticlesService';
import { mapGetters } from 'vuex';

export default {
  name: 'home',
  data() {
    return {
      articles: [],
    }
  },
  created() {
    this.articles = ArticlesService.getArticles();
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  methods: {
    deleteArticle(id) {
      ArticlesService.deleteArticle(id);
      this.articles = ArticlesService.getArticles();
    }
  },
}
</script>

<style scoped>
  .text-truncate-two-lines {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    height: 48px;
  }
  .card-img-top {
    height: 176px;
  }
</style>
