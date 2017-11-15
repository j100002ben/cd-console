import AppliedSchema from '@/components/schema/Applied'
import PageTitle from '@/components/PageTitle'

export default [
  {
    path: '/Schema/Applied',
    name: 'SchemaApplied',
    components: {
      default: AppliedSchema,
      layout_title: PageTitle
    },
    props: {
      default: false,
      layout_title: {
        title: 'Applied Schema'
      }
    },
    meta: {
      requiresAuth: true
    }
  }
]
