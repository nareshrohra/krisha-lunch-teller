const cerebrum = require('./cerebrum');

function handler(args) {
    var forDay = process.argv.length > 2 ? process.argv[2] : 'today';
    console.log(cerebrum.tellLunchForDay(forDay));
}

handler();
