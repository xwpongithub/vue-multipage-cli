import Vue from 'vue';
import 'styl/index';

import 'element-ui/lib/theme-default/index.css';

import Index from 'modules/Index/Index';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => (h(Index))
});
