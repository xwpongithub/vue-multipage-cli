import Vue from 'vue';
import 'styl/index';

import Index from 'modules/Index/Index';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => (h(Index))
});
