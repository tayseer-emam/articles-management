<template>
  <div class="row register">
    <div v-if="errorMessage" class="col-xs-12 col-md-6 offset-md-3">
      <div class="alert alert-danger" role="alert">{{ errorMessage }}</div>
    </div>
    <div class="col-xs-12 col-md-6 offset-md-3">
      <div class="card">
      <ValidationObserver v-slot="{ passes }">
        <form class="card-body" @submit.prevent="passes(register)" novalidate>
          <h5 class="card-title text-center mb-4">Create your account to get started</h5>
          <div class="form-group">
            <label for="first-name">First Name</label>
            <ValidationProvider name="First Name" rules="required" v-slot="{ errors, classes }">
              <input
                type="text"
                class="form-control"
                :class="{'is-invalid': classes.invalid}"
                id="first-name"
                placeholder="First Name"
                v-model.trim="accountInfo.firstName"
              />
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="last-name">Last Name</label>
            <ValidationProvider name="Last Name" rules="required" v-slot="{ errors, classes }">
              <input
                type="text"
                class="form-control"
                :class="{'is-invalid': classes.invalid}"
                id="last-name"
                placeholder="Last Name"
                v-model.trim="accountInfo.lastName"
              />
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <ValidationProvider name="Email" rules="required|email" v-slot="{ errors, classes }">
              <input
                type="email"
                class="form-control"
                :class="{'is-invalid': classes.invalid}"
                id="email"
                placeholder="Enter email"
                v-model.trim="accountInfo.email"
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
                v-model.trim="accountInfo.password"
              />
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <button type="submit" class="btn btn-primary">Register</button>
            <router-link to="/login" class="float-right card-link">Already have an account?</router-link>
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
  name: 'register',
  data() {
    return {
      accountInfo: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
      },
      errorMessage: null,
    }
  },
  methods: {
    async register() {
      try {
        const newUser = await AuthService.register(this.accountInfo);
        this.$store.dispatch('logIn', newUser);
        this.$router.push({ name: 'home' });
      } catch ({ message }) {
        this.errorMessage = message;
      }
    }
  },
}
</script>
