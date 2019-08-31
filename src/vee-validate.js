import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize } from "vee-validate"
import { required, email } from 'vee-validate/dist/rules'
import en from "vee-validate/dist/locale/en.json"

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('required', required);
extend('email', email);

localize({
  en
});