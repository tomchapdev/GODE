const { program } = require('commander');
const fs = require('fs');

program
  .name('gode')
  .description('CLI game object data exporter')
  .version('0.1.0');

program.command('char')
  .argument('<string>', "Format: 'Name Str Dex Con Int Wis Cha HP AC Prof' -f filename")
  .description('Exports character stats to json. For the name use an underscore instead of a space, spaces separate data.')
  .option('-f, --file <value>', 'Filename for exisiting json', 'new')
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

    if (options.file == 'ne') {
      const statsArray = [stats, stats];
      fs.writeFile('new.json', JSON.stringify(statsArray, null, 2), function(error, result) {
        if(error) console.log('error', error);
    });
    }
    else {
      let filename = `./${options.file}.json`;
      const file = require(filename);
      //console.log(file);

      var test = JSON.parse(file);
      console.log(test);
    }

    //console.log(JSON.stringify(stats));
  });

program.command('wep')
.argument('<string>', "Format: 'Name DmgDice DmgStat(str or dex or best)' -f filename")
.description('Exports weapon stats to json. For the name replace spaces with underscores, spaces separate data.')
.option('-f, --file <value>', 'Filename for exisiting json', 'new')
.action((str, options) => {
  const data = str.split(' ');

  const stats = {
    name: data[0],
    damageDice: data[1],
    damageStat: data[2]
  };

  console.log(options.file);
  console.log(JSON.stringify(stats));
});

program.parse();