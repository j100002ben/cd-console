import DevelopmentSchema from '@/components/schema/Development'
import SchemaAdd from '@/components/schema/Add'
import SchemaUpdate from '@/components/schema/Update'
import SchemaPublish from '@/components/schema/Publish'
import SchemaDelete from '@/components/schema/Delete'
import PageTitle from '@/components/PageTitle'

export default [
  {
    path: '/Schema/Development',
    name: 'SchemaDevelopment',
    components: {
      default: DevelopmentSchema,
      layout_title: PageTitle
    },
    props: {
      default: false,
      layout_title: {
        title: 'Development Schema',
        link: {
          to: {name: 'SchemaAdd'},
          title: 'Add Schema',
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
    path: '/Schema/Add',
    name: 'SchemaAdd',
    components: {
      default: SchemaAdd,
      layout_title: PageTitle
    },
    props: {
      default: false,
      layout_title: {
        title: 'Add Schema (Development)',
        link: {
          to: {name: 'SchemaDevelopment'},
          title: 'Back',
          html: '<i class="material-icons">keyboard_return</i>',
          class: 'mdl-button--icon'
        }
      }
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Schema/:SchemaArn/Update',
    name: 'SchemaUpdate',
    components: {
      default: SchemaUpdate,
      layout_title: PageTitle
    },
    props: {
      default: true,
      layout_title: {
        title: 'Update Schema (Development)',
        link: {
          to: {name: 'SchemaDevelopment'},
          title: 'Back',
          html: '<i class="material-icons">keyboard_return</i>',
          class: 'mdl-button--icon'
        }
      }
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Schema/:SchemaArn/Publish',
    name: 'SchemaPublish',
    components: {
      default: SchemaPublish,
      layout_title: PageTitle
    },
    props: {
      default: true,
      layout_title: {
        title: 'Publish Development Schema',
        link: {
          to: {name: 'SchemaDevelopment'},
          title: 'Back',
          html: '<i class="material-icons">keyboard_return</i>',
          class: 'mdl-button--icon'
        }
      }
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Schema/:SchemaArn/Delete',
    name: 'SchemaDelete',
    components: {
      default: SchemaDelete,
      layout_title: PageTitle
    },
    props: {
      default: true,
      layout_title: {
        title: 'Delete Schema',
        link: {
          lastPage: true,
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
