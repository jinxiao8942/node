app = 
  name: 'TEST'
  domain: 'localhost'
  env: 'local'
  port: 4000
  defaultPort: [80,8080]
  scripts: []
  baseUrl: ()->
    x = @domain
    if (!_.contains(@defaultPort, @port))
      x = @domain + ':' + @port
  jsPrefix: ()->
    x = if @env isnt 'local' then '.min' else ''
    x