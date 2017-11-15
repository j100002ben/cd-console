import Directory from '@/components/Directory'
import DirectoryAdd from '@/components/DirectoryAdd'
import PageTitle from '@/components/PageTitle'

export default [
  {
    path: '/Directory',
    name: 'Directory',
    components: {
      default: Directory,
      layout_title: PageTitle
    },
    props: {
      default: false,
      layout_title: {
        title: 'Directory',
        link: {
          to: {name: 'DirectoryAdd'},
          title: 'Add Directory',
          html: '<i class="material-icons">add</i>',
          class: 'mdl-button--icon'
        }
      }
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Directory/Add',
    name: 'DirectoryAdd',
    components: {
      default: DirectoryAdd,
      layout_title: PageTitle
    },
    props: {
      default: false,
      layout_title: {
        title: 'Add Directory',
        link: {
          to: {name: 'Directory'},
          title: 'Back',
          html: '<i class="material-icons">keyboard_return</i>',
          class: 'mdl-button--icon'
        }
      }
    },
    meta: {
      requiresAuth: true
    }
  }
]
