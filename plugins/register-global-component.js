import Vue from 'vue'
import LinkMember from '../components/utils/LinkMember'
import TextInput from '../components/utils/TextInput'
import Priority from '../components/utils/priority/Index'

import CreateMatterForm from '../components/matters/CreateMatterForm'


// Utils
Vue.component('member-link', LinkMember)
Vue.component('input-list', TextInput)
Vue.component('priority-list', Priority)

// Matters
Vue.component('create-matter-form', CreateMatterForm)
