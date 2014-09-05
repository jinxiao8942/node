requirejs.config({
  paths: {
    mixins: 'jsx/mixins' + app.jsPrefix()
    page: 'jsx/page/index' + app.jsPrefix()
  }
});

# Start the main app logic.
requirejs [
    'page'
  ], ()->
    React.renderComponent(
      IndexPage(null),
      document.getElementById('the-body')
    )