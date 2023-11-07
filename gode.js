const { program } = require('commander');
const { assert } = require('console');
const fs = require('fs');
const { format } = require('path');

program
  .name('gode')
  .description('CLI game object data exporter')
  .version('0.1.0');

program.command('char')
  .argument('<string>', "Format: 'Name Str Dex Con Int Wis Cha HP AC Prof' -f filename")
  .description('Exports character stats to json. For the name use an underscore instead of a space, spaces separate data.')
  .option('-f, --file <value>', 'Filename for exisiting json', 'tempChar')
  .action((str, options) => {
    const data = str.split(' ');

    const stats = {
      name: data[0],
      strength: +data[1],
      dexterity: +data[2],
      constitution: +data[3],
      intelligence: +data[4],
      wisdom: +data[5],
      charisma: +data[6],
      hitPoints: +data[7],
      armourClass: +data[8],
      proficiency: +data[9]
    };
    const statsArray = [stats]; // Put into an array for formatting purposes

    if (options.file == 'tempChar') { // No filename so use temp.json
      fs.writeFile('tempChar.json', JSON.stringify(statsArray, null, 2), function(error, result) {
        if(error) console.log('error', error);
      });
    }
    else {
      let filename = `./${options.file}.json`;
      const statsArray = require(filename);

      statsArray[statsArray.length] = stats;

      fs.writeFile(filename, JSON.stringify(statsArray, null, 2), function(error, result) {
        if(error) console.log('error', error)
      });
    }
  });

program.command('wep')
.argument('<string>', "Format: 'Name DmgDice DmgStat(str or dex or best)' -f filename")
.description('Exports weapon stats to json. For the name replace spaces with underscores, spaces separate data.')
.option('-f, --file <value>', 'Filename for exisiting json', 'tempWep')
.action((str, options) => {
  const data = str.split(' ');

  const stats = {
    name: data[0],
    damageDice: data[1],
    damageStat: data[2]
  };
  const statsArray = [stats]; // Put into an array for formatting purposes

  if (options.file == 'tempWep') { // No filename so use temp.json
    fs.writeFile('tempWep.json', JSON.stringify(statsArray, null, 2), function(error, result) {
      if(error) console.log('error', error);
    });
  }
  else {
    let filename = formatFilepath(options.file);
    const statsArray = require(filename);

    statsArray[statsArray.length] = stats;

    fs.writeFile(filename, JSON.stringify(statsArray, null, 2), function(error, result) {
      if(error) console.log('error', error)
    });
  }
});

program.parse();

function formatFilepath(filepath) {
  if (filepath.length > 4)
  {
    let extension = filepath.slice(filepath.length - 4) === '.json';
    let dotSlash = filepath.slice(0, 2) === './';
    if (dotSlash && extension) return filepath;
    else if (dotSlash) return `${filepath}.json`;
    else if (extension) return `./${filepath}`;
    else return `./${filepath}.json`;
  }
  else if (filepath.length > 2)
  {
    let dotSlash = filepath.slice(0, 2) === './';
    if (dotSlash) return `${filepath}.json`;
    else return `./${filepath}.json`;
  }
  else return `./${filepath}.json`;
}