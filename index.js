const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const { User } = require('./models/User');

const corsOptions = {
    origin: 'http://localhost:5000/', // 허락하고자 하는 요청 주소
    credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());


const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Cielo:@rnrcjs21@cluster0.pdwey.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
}).then(() => console.log("MongoDB Connected")).catch(err => console.log(err));


app.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send('Hello World!')
});

// 회원가입을 위한 라우트
app.post('/register', (req, res) => {
    // 회원가입할때 필요한 정보를 클라이언트에서 가져오면 그것들을 DataBase에 넣어준다.

    const user = new User(req.body);

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));