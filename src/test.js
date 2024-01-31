// const { Utils } = require('alchemy-sdk');

// let gas = "0x0488848a04";

// console.log(Utils.formatEther(parseInt(gas)));
// console.log(Utils.formatUnits(Number(gas), 'ether'));
// console.log(Utils.formatUnits(parseInt(gas), 'gwei'));

const timeStamp = 1706692799;

const dateTime = new Date(timeStamp * 1000);

console.log(dateTime.toUTCString());