import PublishedSchema from '@/components/schema/Published'
import SchemaApply from '@/components/schema/Apply'
import PageTitle from '@/components/PageTitle'

export default [
  {
    path: '/Schema/Published',
    name: 'SchemaPublished',
    components: {
      default: PublishedSchema,
      layout_title: PageTitle
    },
    props: {
      default: false,
      layout_title: {
        title: 'Published Schema'
      }
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Schema/:SchemaArn/Apply',
    name: 'SchemaApply',
    components: {
      default: SchemaApply,
      layout_title: PageTitle
    },
    props: {
      default: true,
      layout_title: {
        title: 'Apply Published Schema',
        link: {
          to: {name: 'SchemaPublished'},
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
