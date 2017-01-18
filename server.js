// # SimpleServer
// A simple chat bot server
var logger = require('morgan');
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var router = express();
var path = require('path');

var app = express();  
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
var server = http.createServer(app);
var request = require("request");

app.get('/', (req, res) => {
  res.send("Home page. Server running okay.");
});

app.get('/chatonline', function(req, res) {
  res.sendFile(path.join(__dirname, 'chatonline', 'index.html'));
});

// Đây là đoạn code để tạo Webhook
app.get('/webhook', function(req, res) {
  if (req.query['hub.verify_token'] === 'facebook_bot_message_spec') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});


// Xử lý khi có người nhắn tin cho bot
app.post('/webhook', function(req, res) {
  var entries = req.body.entry;
  for (var entry of entries) {
    var messaging = entry.messaging;
    for (var message of messaging) {
      var senderId = message.sender.id;
      if (message.message) {
        // If user send text
        if (message.message.text) {
          var text = message.message.text;
          console.log(text); // In tin nhắn người dùng
          contentMessage(senderId, text);
        }
      }
    }
  }
  res.status(200).send("OK");
});


// Gửi thông tin tới REST API để trả lời
function sendMessage(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: "EAACtogmkBPIBADZCpTACMNQ03ZB0iA8lUEuBWySp2KoZBLryFISOkKf1NtnEltjVJ6zniZCbtmzvstk5v51ld6TGukkIoyoTBZBPpvK9eJpb2K2rGFacXYKPe9l9HPW4tPGQASgW6nRasB2kYrMDT9enTYP48J0WkRoJIZCdMfxAZDZD",
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      message: {
        text: message
      },
    }
  });
}

/* Function Send Message */
function contentMessage(senderId, text){
  if ( checkString(text, 'bye') || checkString(text, 'tam biet') || checkString(text, 'hen gap lai') ){
    sendMessage(senderId, 'Chào tạm biệt và hẹn gặp lại :)');
    return;
  } else if ( checkString(text, 'xin chao') || checkString(text, 'hello') || text == 'hi' ){
    sendMessage(senderId, 'Xin chào bạn ni:))');
    return;
  } else if ( checkString(text,'dota') && checkString(text,'lol') ){
    sendMessage(senderId, "3Q");
    return;
  } else if ( checkString(text,'dota') ){
    sendMessage(senderId, "Doto is the best, #S is the best :3");
    return;
  } else if ( checkString(text,'lol') || checkString(text,'lien minh')  ){
    sendMessage(senderId, "LOL là gì vậy ? =)))");
    return;
  } else if ( checkString(text, 'sai') || checkString(text, 'wrong') || checkString(text, 'khong') ){
    sendMessage(senderId, 'Giỏi thì nói xem nào ~_~');
    return;
  } else if ( checkString(text, 'hi hi') || checkString(text, 'ha ha') || checkString(text, 'ho ho') || checkString(text, 'he he') || checkString(text, 'hih') || checkString(text, 'hah') || checkString(text, 'hoh') || checkString(text, 'heh') || checkString(text, '))')){
    sendMessage(senderId, 'Cười giề vậy :O');
    return;
  } else if ( checkString(text, 'hu hu') || checkString(text, 'huh') || checkString(text, ':(') ){
    sendMessage(senderId, 'Buồn làm giề cho đời thêm khổ :D');
    return;
  } else if ( checkString(text, 'manh') || checkString(text, 'chich') ) {
    sendMessage(senderId, 'Đúng rồi, mạnh nữa đi, sướng, a a aaaaaaaa....');
    return;
  } else if ( checkString(text, 'yeu') || checkString(text, 'love') || checkString(text, 'thich') ) {
    sendMessage(senderId, 'Yêu giề');
    return;
  } else if ( checkString(text, 'shit') || checkString(text, 'cuc cuc') ) {
    sendMessage(senderId, 'Tự bốc mà ăn :3');
    return;
  } else if ( checkString(text, 'ke') || checkString(text, 'xa') || checkString(text, 'bo mac') ) {
    sendMessage(senderId, 'Đừng vậy mà :(');
    return;
  } else if ( checkString(text, 'vai') || checkString(text, 'thoi')  ){
    sendMessage(senderId, 'Anh lo tán em đi không em lậy đọ');
    return;
  } else if ( checkString(text, '??') || checkString(text, 'la sao') ){
    sendMessage(senderId, 'Không hiểu thì thôi zạ :v');
    return;
  } else if ( checkString(text, 'dep') || checkString(text, 'beautiful') || checkString(text, 'de thuong') || checkString(text, 'dang yeu') || checkString(text, 'xinh') ){
    sendMessage(senderId, 'Bẩm sinh vậy ồi :v khổ ghê :p');
    return;
  } else if ( checkString(text, 'that') || checkString(text, 'sure') || checkString(text, 'the a') ){
    sendMessage(senderId, 'Uầy, em chỉ biết nói đúng không à :v');
    return;
  } else if ( checkString(text, 'khoa') || checkString(text, 'spec') || checkString(text, 'sonic') || checkString(text, 'bin') || checkString(text, 'sp') ){
    sendMessage(senderId, 'Là người thông minh, đẹp chai nhất a hi hi');
    return;
  } else if ( checkString(text, 'rang rua') || checkString(text, 'chi rua') || checkString(text, 'rua da') ){
    sendMessage(senderId, 'Răng với rứa chi đây -_-');
    return;
  } else if ( checkString(text, 'mo na') || checkString(text, 'mo he') || checkString(text, 'rua te')){
    sendMessage(senderId, 'Mô tê chi đây hè!');
    return;
  } else if ( checkString(text, 'who') || checkString(text, 'la ai') || checkString(text, 'la gi') ){
    sendMessage(senderId, 'Siêu nhân điện quang');
    return;
  } else if ( checkString(text, 'la sao') || checkString(text, 'how') || checkString(text, 'wth') || checkString(text, 'what') ){
    sendMessage(senderId, 'Bó tay :p');
    return;
  } else if ( checkString(text, 'ngu ngon') || checkString(text, 'mo dep') || checkString(text, 'g9') || checkString(text, 'good nice')) {
    sendMessage(senderId, 'Cảm ơn :3');
    return;
  } else if ( checkString(text, 'thong minh') || checkString(text, 'gioi') || checkString(text, 'hay') || checkString(text, 'tai') || checkString(text, 'vay a') || checkString(text, 'vay sao') || checkString(text, 'the a') || checkString(text, 'the sao') || checkString(text, 'nice') ){
    sendMessage(senderId, 'Tất nhiên rồi =)) ');
    return;
  } else if ( checkString(text, 'an') || checkString(text, 'uong') ){
    sendMessage(senderId, 'Lên cân đó :p');
    return;
  } else if ( checkString(text, 'dong y') || checkString(text, 'tan thanh') || checkString(text, 'nhat tri') || checkString(text, 'like') ){
    sendMessage(senderId, 'Vâng, em cũng thấy vậy đó mờ :3');
    return;
  } else if ( checkString(text, 'anh') || checkString(text, 'em') ){
    sendMessage(senderId, 'Không!!!!!!!!!!!');
    return;
  } else if ( checkString(text, 'wtf') || checkString(text, 'im') || checkString(text, 'cc') || checkString(text, 'vl') || checkString(text, 'cl') || checkString(text, 'cm') || checkString(text, 'dm') || checkString(text, 'fuck') || checkString(text, 'loz') ) {
    sendMessage(senderId, 'CMM');
    return;
  } else if ( checkString(text, 'ngon') || checkString(text, 'ngot') ) {
    sendMessage(senderId, 'Tuyệt vời ^_^');
    return;
  } else if ( checkString(text, 'ghe') || checkString(text, 'dung') || checkString(text, 'true') ) {
    sendMessage(senderId, 'Vâng, em cũng thấy thế');
    return;
  } else if ( text == '@' || text == '..' || text == ':|' || text == '-_-' || text == '~_~' ||  checkString(text, 'cai gie') || checkString(text, 'u') || checkString(text, 'o') || checkString(text, '?') ) {
    sendMessage(senderId, 'a hi hi');
    return;
  } else if ( checkString(text, '1') || checkString(text, '2') || checkString(text, '3') || checkString(text, '4') || checkString(text, '5') || checkString(text, '6') || checkString(text, '7') || checkString(text, '8') || checkString(text, '9') || checkString(text, '0') ) {
    sendMessage(senderId, 'Viết chữ đi, đừng viết số túi bó tay a nả -_-');
    return;
  } else {
    sendMessage(senderId, 'Nói giề vậy chài ~.~');
    return;
  }
}

/*Function Check String*/
function checkString(string, substring){
  string = bodauTiengViet(string);
  if ( string.indexOf(substring) !== -1 ){
    return true;
  } else {
    return false;
  }
} 

/*Function Bỏ Dấu*/
function bodauTiengViet(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '0.0.0.0');

server.listen(app.get('port'), app.get('ip'), function() {
  console.log("Chat bot server listening at %s:%d ", app.get('ip'), app.get('port'));
});