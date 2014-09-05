requirejs.config({
  paths: {
    mixins: 'jsx/mixins' + app.jsPrefix(),
    page: 'jsx/page/index' + app.jsPrefix()
  }
});

requirejs(['page'], function() {
  return React.renderComponent(IndexPage(null), document.getElementById('the-body'));
});
