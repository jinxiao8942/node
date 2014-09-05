/** @jsx React.DOM */
var HeaderWrapper = React.createClass({displayName: 'HeaderWrapper',
  render: function() {
    return (
      React.DOM.div({className: "header-wrapper master-width"}, 
        ReactBootstrap.PageHeader(null, "TEST ", React.DOM.small(null, "sample"))
      )
    );
  }
});

var ContentWrapper = React.createClass({displayName: 'ContentWrapper',
  render: function() {
    return (
      React.DOM.div({className: "content-wrapper layout1 master-width"}, 
        "Put your codes here", 
        React.DOM.br(null), React.DOM.br(null)
      )
    );
  }
});

var FooterWrapper = React.createClass({displayName: 'FooterWrapper',
  render: function() {
    return (
      React.DOM.div({className: "footer-wrapper master-width"}, 
        "PEX Admin © 2014" 
      )
    );
  }
});

var IndexPage = React.createClass({displayName: 'IndexPage',
  render: function() {
    return (
      React.DOM.div({className: "master"}, 
        HeaderWrapper(null), 
        ContentWrapper(null), 
        FooterWrapper(null)
      )
    );
  }
});