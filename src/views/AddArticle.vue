<template>
  <div class="add-article">
    <div v-if="error" class="alert alert-danger col-xs-12 col-md-6 offset-md-3" role="alert">{{ error }}</div>
    <div v-if="!isAuthorized" class="alert alert-danger col-xs-12 col-md-6 offset-md-3" role="alert">You are not authorized to edit this article</div>
    <div class="card col-xs-12 col-md-6 offset-md-3 mb-5 p-0" v-if="isAuthorized">
      <ValidationObserver v-slot="{ passes }">
        <form class="card-body" @submit.prevent="passes(addArticle)" novalidate>
          <h5 class="card-title text-center mb-4">{{ isEditMode ? 'Edit': 'Add new' }} article</h5>
          <div class="form-group">
            <label for="title">Title</label>
            <ValidationProvider name="Title" rules="required" v-slot="{ errors, classes }">
              <input
                type="text"
                class="form-control"
                :class="{'is-invalid': classes.invalid}"
                id="title"
                placeholder="Title"
                v-model.trim="article.title"
              />
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <ValidationProvider name="Content" rules="required" v-slot="{ errors }">
              <ckeditor :editor="editor" v-model="article.content" :config="editorConfig"></ckeditor>
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="image">Image</label>
            <input
              type="file"
              class="form-control-file"
              accept=".jpg,.jpeg,.png,.gif"
              @change="uploadImage"
            />
            <ValidationProvider name="Image" rules="required" v-slot="{ errors }">
              <input type="hidden" v-model="selectedImage">
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </ValidationProvider>
            <div v-if="article.image" class="mt-4">
              <img :src="article.image" class="img-fluid" alt="Image">
            </div>
          </div>
          <button type="submit" class="btn btn-primary">{{ isEditMode ? 'Edit': 'Add' }} Article</button>
          <router-link :to="{ name: 'home' }" class="btn btn-link">Cancel</router-link>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ArticlesService from '@/services/ArticlesService';
import { mapGetters } from 'vuex';

export default {
  name: 'add-article',
  data() {
    return {
      article: {
        title: null,
        content: null,
        date: null,
        image: null,
      },
      editor: ClassicEditor,
      editorConfig: {toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable', 'undo', 'redo' ]},
      error: null,
      isEditMode: false,
      isAuthorized: true,
      selectedImage: null,
    }
  },
  created() {
    const { id } = this.$route.params;
    if(id) {
      this.isEditMode = true;
      this.article = ArticlesService.getArticle(id);
      this.selectedImage = this.article.image;
      if(this.article.ownerId !== this.user.id) {
        this.isAuthorized = false;
      }
    }
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  methods: {
    async addArticle() {
      try {
        if(this.isEditMode) {
          await ArticlesService.editArticle(this.article);
        } else {
          await ArticlesService.addArticle(this.article);
        }
        this.$router.push({ name: 'home' });
      } catch ({ message }) {
        this.error = message;
        window.scrollTo(0,0);
      }
      
    },
    uploadImage(e) {
      const [ file ] = e.target.files;
      if(!file) {
        return;
      }
      if(file.type.indexOf('image') === -1) {
        this.error = 'Only images are allowed';
        return;
      }
      if(file.size >= 4000000) {
        this.error = 'Image Size should be 4MB or less';
        return;
      }
      this.selectedImage = e.target.value;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.article.image = e.target.result;
      }
      reader.readAsDataURL(file);
    }
  },
}
</script>

<style >
.ck-editor__editable {
  min-height: 250px;
}
.invalid-feedback {
  display: block !important;
}
</style>
