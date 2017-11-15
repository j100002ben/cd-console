import Start from '@/components/Start'
import PageTitle from '@/components/PageTitle'

export default [
  {
    path: '/',
    name: 'Start',
    components: {
      default: Start,
      layout_title: PageTitle
    },
    props: {
      default: false,
      layout_title: {
        title: 'AWS Cloud Directory Console'
      }
    }
  }
]
