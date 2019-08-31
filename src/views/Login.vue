<template>
  <div class="row login">
    <div v-if="errorMessage" class="col-xs-12 col-md-6 offset-md-3">
      <div class="alert alert-danger" role="alert">{{ errorMessage }}</div>
    </div>
    <div class="col-xs-12 col-md-6 offset-md-3">
      <div class="card">
        <ValidationObserver v-slot="{ passes }">
          <form class="card-body" @submit.prevent="passes(login)" novalidate>
            <h5 class="card-title text-center mb-4">Log in to your account</h5>
            <div class="form-group">
              <label for="email">Email address</label>
              <ValidationProvider name="Email" rules="required|email" v-slot="{ errors, classes }">
                <input
                  type="email"
                  class="form-control"
                  :class="{'is-invalid': classes.invalid}"
                  id="email"
                  placeholder="Enter email"
                  v-model.trim="credentials.email"
                />
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <ValidationProvider name="Password" rules="required" v-slot="{ errors, classes }">
                <input
                  type="password"
                  class="form-control"
                  :class="{'is-invalid': classes.invalid}"
                  id="password"
                  placeholder="Password"
                  v-model.trim="credentials.password"
                />
                <div class="invalid-feedback">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <button type="submit" class="btn btn-primary">Log in</button>
              <router-link to="/register" class="float-right">Don't have an account?</router-link>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'

export default {
  name: 'login',
  data() {
    return {
      credentials: {
        email: null,
        password: null,
      },
      errorMessage: null,
    }
  },
  methods: {
    async login() {
      try {
        const user = await AuthService.login(this.credentials);
        this.$store.dispatch('logIn', user);
        this.$router.push({ name: 'home' });
      } catch ({ message }) {
        this.errorMessage = message;
      }
    }
  },
}
</script>
