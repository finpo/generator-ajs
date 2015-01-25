'use strict';

angular.module('<%= scriptAppName %>')
<% if( name == 'config'){ %>
//for develop
.value('APIURL', 'http://dev.ushop.cool');
//for production
// .value('APIURL', 'http://dev.ushop.cool');
<% } else { %>
  .value('<%= cameledName %>', 'value');
<% } %>
