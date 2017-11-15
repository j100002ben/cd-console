import NotFound from '@/components/NotFound'
import PageTitle from '@/components/PageTitle'

export default [
  {
    path: '*',
    components: {
      default: NotFound,
      layout_title: PageTitle
    },
    props: {
      default: false,
      layout_title: {
        title: '404 Not Found'
      }
    }
  }
]
