var fs = require('fs');

for (let i = 1; i < 778; i++) {
  const data = fs.readFileSync(i + '.json',
    { encoding: 'utf8', flag: 'r' });
  const jsonData = JSON.parse(data);
  jsonData.description = jsonData.description.replace("Analaytical", "Analytical");
  delete jsonData['copies'];
  fs.writeFileSync(i + '.json', JSON.stringify(jsonData));
}
