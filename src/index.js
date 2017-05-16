import TMap from './json-map/jsonMap.vue'
import Tkv from './json-map/keyValuePair.vue'
import PlusBtn from './json-map/plus.vue'
import MinusBtn from './json-map/minus.vue'
import Select from './json-map/select.vue'
import JsonEditor from './json-map/jeditor.vue'

const install = function(Vue) {
    Vue.component('t-map',TMap );
    Vue.component('t-kv',Tkv );
    Vue.component('t-plus-btn',PlusBtn );
    Vue.component('t-minus-btn',MinusBtn );
    Vue.component('t-select',Select );
    Vue.component('v-json-editor',JsonEditor );
};

export default {install}