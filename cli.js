var yarg = require("yargs");
var fs = require("fs");

var fs = require("fs");

class Family {
  constructor(name) {
    fs.readFile(`family.json`, (err, data) => {
      if (err) {
      } else {
        var data2 = JSON.parse(data);
        this.name = data2.name;
        this.adults = data2.adults;
        this.children = data2.children;
        console.log("Imported " + this.name + " Family");
        return;
      }
    });

    this.name = name;
    this.adults = [];
    this.children = [];
  }
  addAdultMember(name, age, gender) {
    this.adults.push({
      name,
      age,
      gender,
    });
    console.log(`Welcome ${name}`);
  }
  addChild(name, age, gender) {
    this.children.push({ name, age, gender });
    console.log(`Hello! and welcome ${name}`);
  }

  exportFamily() {
    fs.writeFile(`family.json`, JSON.stringify(this), (err) => {
      if (err) throw err;
      console.log("Exported " + this.name + " Family");
    });
  }
}

var options =
  // .option("adult", { alias: "ad", describe: "Add an adult member", type: "array", demandOption: false })
  // .option("child", { alias: "ch", describe: "Add a child", type: "string", demandOption: false })
  yarg
    .usage("Usage: -n <FamilyName>")
    .command({
      command: "new",
      describe: "Your Family name",
      handler(argv) {
        var family = new Family(argv.n);
        family.exportFamily();
      },
    })

    .command({
      command: "addAdult",
      describe: "Add a adult member to your family",
      handler(argv) {
        var data = JSON.parse(fs.readFileSync(`family.json`));
        var family = new Family(
          JSON.parse(fs.readFileSync(`family.json`)).name
        );
        family.children = data.children;
        family.adults = data.adults;
        family.addAdultMember(argv.name, argv.age, argv.gender);

        family.exportFamily();
      },
    })
    .command({
      command: "addChild",
      describe: "Add a child member to your family",
      handler(argv) {
        var data = JSON.parse(fs.readFileSync(`family.json`));
        var family = new Family(
          JSON.parse(fs.readFileSync(`family.json`)).name
        );
        family.children = data.children;
        family.adults = data.adults;
        family.addChild(argv.name, argv.age, argv.gender);

        family.exportFamily();
      },
    }).help('Family CLI is JSON based family manager that can create a child,adult and export it')
    .argv;
