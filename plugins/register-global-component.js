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
import MenuTypeList from '../components/matters/MenuTypeList'
import TypeList from '../components/matters/TypeList'
import MenuDate from '../components/matters/MenuDate'

import MenuTime from '../components/matters/MenuTime'

import MenuSwitch from '../components/matters/MenuSwitch'

import ClientList from '../components/matters/ClientList'
import MenuClients from '../components/matters/MenuClients'



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

Vue.component('menu-types', MenuTypeList)
Vue.component('type-list', TypeList)

Vue.component('menu-date', MenuDate)
Vue.component('menu-time', MenuTime)
Vue.component('menu-switch', MenuSwitch)

Vue.component('menu-clients', MenuClients)
Vue.component('client-list', ClientList)


