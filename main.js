var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require(`./lib/template.js`);
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;

    if(pathname == '/'){
      if(queryData.id == undefined){
        response.writeHead(200);
        fs.readdir('./data', function(error, filelist){
            var title = 'Welcome';
            var description = 'Hello, World';
            var list = template.list(filelist);
            var html = template.HTML(title, list, 
              `<h2>${title}</h2><p>${description}</p>`, 
              `<a href="/create">create</a>`
              );     
            response.end(html);
            response.writeHead(220);
        });
      } else {
        response.writeHead(200);
        fs.readdir('./data', function(error, filelist){  
          var filteredId = path.parse(queryData.id).base;
          fs.readFile(`data/${filteredId}`, 'utf-8', function(err, description){
              var title = queryData.id;
              var sanitizedTitle = sanitizeHtml(title);
              var sanitizedDescription = sanitizeHtml(description, {
                allowedTags:['h1']
              });
              var list = template.list(filelist);
              var html = template.HTML(sanitizedTitle, list, 
                `<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`, 
                `<a href="/create">create</a> 
                <a href="/update?id=${sanitizedTitle}">update</a>
                <form action ="/delete_process" method="POST">
                  <input type="hidden" name="id" value="${sanitizedTitle}">
                  <input type="submit" value="delete">
                </form>`
                );     
              response.end(html);
              response.writeHead(404);
          });
        });
      }
    } else if(pathname == '/create'){
      fs.readdir('./data', function(error, filelist){
        var title = 'WEB - create';
        var list = template.list(filelist);
        var html = template.HTML(title, list, `
            <form action="create_process" method="post">
                <p><input type="text" name="title" placeholder="Title"></p>
                <p>
                    <textarea name="description" placeholder="Description"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>`,'');        
        response.writeHead(200);
        response.end(html);
      });
    } else if(pathname == '/create_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;          
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8', 
        function(err){
          response.writeHead(200);
          response.end('success'); 
        })
      });
    } else if(pathname == '/update') {
      response.writeHead(200);
      fs.readdir('./data', function(error, filelist){ 
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf-8', function(err, description){
            var title = queryData.id;
            var list = template.list(filelist);
            var html = template.HTML(title, list,
              `
              <form action="/update_process" method="post">
                <input type="hidden" name="id" value="${title}">            
                <p><input type="text" name="title" placeholder="Title" value="${title}"></p>
                <p>
                    <textarea name="description" placeholder="Description">${description}</textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
              </form>
              `, 
              `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
              );     
            response.end(html);
            response.writeHead(404);
        });
      });
    } else if(pathname == '/update_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;          
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        fs.rename(`data/${id}`, `data/${title}`, function(err){
          fs.writeFile(`data/${title}`, description, 'utf8', 
          function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end('success'); 
          })
        })
      });      
    } else if(pathname == '/delete_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;          
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var filteredId = path.parse(id).base;
        fs.unlink(`data/${filteredId}`, function(error){
          response.writeHead(302, {Location: `/`});
          response.end('success'); 
        })
      });          
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);




// ASIS CODE
/*
function templateHTML(title, list, body, control){  
  return  `
          <html>
          <head>
            <title>WEB - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            ${control}
            ${body}
          </body>
          </html>        
          `;
}

function templateList(filelist){
  var list = `<ul>`;
  for(var i = 0; i < filelist.length; i++){              
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
  }
  list = list + `</ul>`;
  return list;
}
*/