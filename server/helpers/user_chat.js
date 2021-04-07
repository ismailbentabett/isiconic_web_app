const Room = require('../models/room.model')
const Chat = require('../models/chat.model')
const User = require('../models/user.model')
const {
  compareSync
} = require('bcryptjs')

var uuid = require('uuid');




module.exports.generateRooms = async () => {
  let users = await User.find({}, (err, data) => {
    if (err) {
      console.log(err)
    }
    return data
  })

  let followids = users.map((data) => {

    return data.followings

  })

  let id = users.map((data) => {
    //console.log(data.followings)
    return data._id


  })
  //console.log(followids)

  //console.log(followids.length)

  let data = followids.filter((num1, index) => {


    const num2 = id[index];
    const num3 = num1



    return num1;
  });

  combos = [] //or combos = new Array(2);

  for (var i = 0; i < id.length; i++) {
    for (var j = 0; j < followids[i].length; j++) {
      combos.push([id[i], followids[i][j]])
    }
  }


  let index = 0;
  let newArr = [combos[0]];

  while (index != combos.length) {
    let pos0 = combos[index][0];
    let pos1 = combos[index][1];
    let found = false;
    for (let i = 0; i < newArr.length; i++) {
      if ((newArr[i][0] == pos0 && newArr[i][1] == pos1) || (newArr[i][0] == pos1 && newArr[i][1] == pos0)) {
        found = true;
        break;
      }
    }
    if (!found) {
      newArr.push(combos[index]);
    }
    index++;
  }


  let finalresult = newArr.map(x => {


    return {

      "room_name": x.join("_"),
      "chatters": x,
    };


  })





  Room.insertMany(finalresult, {
      ordered: false
    })
    .then(function (docs) {
      console.log("Number of documents inserted: " + docs.length);

      // console.log({ msg: "rooms uploaded to MongoDB Successfully!" });
    })
    .catch(function (err) {
      // error handling here
      console.log("Failed to insert Bulk...not really");
    });

}