var HeaderWrapper = React.createClass({
  render: function() {
    return (
      <div className="header-wrapper master-width">
        <ReactBootstrap.PageHeader>TEST <small>sample</small></ReactBootstrap.PageHeader>
      </div>
    );
  }
});

var ContentWrapper = React.createClass({
  render: function() {
    return (
      <div className="content-wrapper layout1 master-width">
        Put your codes here
        <br /><br />
      </div>
    );
  }
});

var FooterWrapper = React.createClass({
  render: function() {
    return (
      <div className="footer-wrapper master-width">
        PEX Admin &copy; 2014 
      </div>
    );
  }
});

var IndexPage = React.createClass({
  render: function() {
    return (
      <div className="master">
        <HeaderWrapper />
        <ContentWrapper />
        <FooterWrapper />
      </div>
    );
  }
});