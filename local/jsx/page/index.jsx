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
        <div id="dragandrophandler">
          <div><p>we will accept following file types : *.docx, *.doc, *.xlsx, *.xls, *.pptx, *.ppt, *.pub, *.pdf, *.psd, *.ai, *.tar, *.zip</p><p>Available Maxium File Size : 5M</p></div>
          <div><h1>Drag &amp; Drop</h1></div>
          <div>- or -</div>
          <div id="browse-link-btn"><h3>Browse</h3></div>
        </div>
        <h3>Note Your Data</h3>
        <textarea id="note-date" placeholder="Note Your Data">Please wrirte about your self. then, info will be saved in note.txt file when your file is uploaded</textarea>
        <div id="status1"></div>
        <input type="file" id="add-file-input" name="file"/>
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