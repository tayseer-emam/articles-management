<template>
  <div class="article-view">
    <div v-if="article">
      <div class="text-center">
        <img :src="article.image" class="img-fluid" :alt="article.title">
      </div>
      <small class="text-left text-muted mb-5 d-inline-block">{{ article.date }}</small>
      <h1 class="mb-5">{{ article.title }}</h1>
      <div v-html="article.content"></div>
    </div>
    <div v-else class="alert alert-warning" role="alert">
      Article Not Found
    </div>
  </div>
</template>

<script>
import ArticlesService from '@/services/ArticlesService';

export default {
  name: 'article-view',
  data() {
    return {
      article: null,
    }
  },
  created() {
    const { id } = this.$route.params;
    this.article = ArticlesService.getArticle(id);
  },
}
</script>
