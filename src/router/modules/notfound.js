export default [{
  path: '*',
  name: 'NotFound',
  meta: {
    layout: 'empty'
  },
  component: () => import('@/pages/NotFound/NotFound.vue')
}]
