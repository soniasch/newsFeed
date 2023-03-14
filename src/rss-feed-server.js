const http = require('http');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const { getLatestItems, refetchDiFeed } = require('./rssHandler');

const port = 8080;
const templatePath = path.join(__dirname, 'template.hbs');

const server = http.createServer(async (req, res) => {
  if (req.url === '/content.css') {
    const cssPath = path.join(__dirname, 'content.css');
    res.writeHead(200, { 'Content-Type': 'text/css' });
    fs.createReadStream(cssPath).pipe(res);
    return;
  }

  const latestItems = await getLatestItems();

  // Read the Handlebars template file
  const template = fs.readFileSync(templatePath, 'utf8');

  // Compile the template and generate the HTML content
  const compiledTemplate = Handlebars.compile(template);
  const html = compiledTemplate({ items: latestItems, refetchDIFeed: refetchDiFeed });

  // Send the HTML content to the client
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(html);
  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
