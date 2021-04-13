module.exports = {
  copy: {
    to: '../template-commercetools',
    from: [
      {
        path: '../../../node_modules/@vue-storefront/nuxt-theme/theme',
        ignore: [],
        variables: {
          options: {
            generate: {
              replace: {
                apiClient: '@vue-storefront/commercetools-api',
                composables: '@vue-storefront/commercetools'
              }
            }
          }
        },
        watch: false
      },
      {
        path: '.',
        ignore: ['_theme', 'node_modules', '.nuxt', 'generate-template.ts'],
        variables: {},
        watch: false
      }
    ]
  }
}
