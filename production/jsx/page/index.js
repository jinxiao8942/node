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
        React.DOM.div({id: "dragandrophandler"}, 
          React.DOM.div(null, React.DOM.p(null, "we will accept following file types : *.docx, *.doc, *.xlsx, *.xls, *.pptx, *.ppt, *.pub, *.pdf, *.psd, *.ai, *.tar, *.zip"), React.DOM.p(null, "Available Maxium File Size : 5M")), 
          React.DOM.div(null, React.DOM.h1(null, "Drag & Drop")), 
          React.DOM.div(null, "- or -"), 
          React.DOM.div({id: "browse-link-btn"}, React.DOM.h3(null, "Browse"))
        ), 
        React.DOM.h3(null, "Note Your Data"), 
        React.DOM.textarea({id: "note-date", placeholder: "Note Your Data"}, "Please wrirte about your self. then, info will be saved in note.txt file when your file is uploaded"), 
        React.DOM.div({id: "status1"}), 
        React.DOM.input({type: "file", id: "add-file-input", name: "file"})
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