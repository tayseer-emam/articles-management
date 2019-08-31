<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
    <router-link :to="{ name: 'home' }" class="navbar-brand mb-0 h1">Articles Management</router-link>

    <button @click="isNavOpen = !isNavOpen" class="navbar-toggler" type="button">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" :class="{'show': isNavOpen}" v-show="isNavOpen">
      <template v-if="isLoggedIn">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'add-article' }" class="nav-link" active-class="active">Add Article</router-link>
          </li>
        </ul>
        <span class="navbar-text">Welcome, {{ `${user.firstName} ${user.lastName}` }}</span>
      </template>
      <div v-if="!isLoggedIn" class="ml-auto">
        <router-link class="btn btn-outline-light my-2 my-sm-0" to="/login">Log in</router-link>
        <router-link class="btn btn-outline-light my-2 my-sm-0 ml-4" to="/register">Register</router-link>
      </div>
      <button v-else class="btn btn-danger ml-md-4 ml-2 log-out" @click="LogOut">Log Out</button>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'navbar',
  data() {
    return {
      isNavOpen: false,
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'isLoggedIn'
    ])
  },
  methods: {
    LogOut() {
      this.$store.dispatch('logOut');
      this.$router.push({ name: 'login'});
    }
  },
}
</script>