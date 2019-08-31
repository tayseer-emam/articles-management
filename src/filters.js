import Vue from 'vue';

Vue.filter('clean', v => {
  const container = document.createElement('div');
  container.innerHTML = v;
  return container.innerText;
});