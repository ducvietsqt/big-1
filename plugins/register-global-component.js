import Vue from 'vue'
import LinkMember from '../components/utils/LinkMember'
import TextInput from '../components/utils/TextInput'

import CreateMatterForm from '../components/matters/CreateMatterForm'
import AvatarMember from '../components/matters/AvatarMember'
import MenuAbsolute from '../components/matters/MenuAbsolute'
import MenuPriority from '../components/matters/MenuPriority'
import PriorityList from '../components/matters/PriorityList'
import MenuMember from '../components/matters/MenuMember'
import MemberList from '../components/matters/MemberList'


// Utils
Vue.component('member-link', LinkMember)
Vue.component('input-list', TextInput)

// Matters
Vue.component('create-matter-form', CreateMatterForm)
Vue.component('avatar-member', AvatarMember)
Vue.component('menu-absolute', MenuAbsolute)

Vue.component('menu-priority', MenuPriority)
Vue.component('priority-list', PriorityList)

Vue.component('menu-member', MenuMember)
Vue.component('member-list', MemberList)
