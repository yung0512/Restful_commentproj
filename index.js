const express = require('express');
const app = express();
const path = require('path')
const { v4: uuid } = require('uuid');
uuid();
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


const comments = [{
        id: uuid(),
        username: 'jeff',
        comment: 'oh my god'
    },
    {
        id: uuid(),
        username: 'cindy',
        comment: 'hehehe'
    },
    {
        id: uuid(),
        username: 'mornica',
        comment: 'oh my god!!!'
    }
]
app.get('/comments', (req, res) => {
        res.render('comments/index', { comments })

    }) //get 到目前所有comments的資料
app.post('/comments', (req, res) => {
        const { username, comment } = req.body;
        const mes = req.body;
        comments.push({ username, comment });
        res.redirect('/comments')
    })
    //從/comments/new的form表格提出的post請求並更新comment 需要重新導向至其他網頁不然會重複送出一樣的訊息
app.get('/comments/new', (req, res) => {
        res.render('comments/new');
    })
    //處理提出新訊息的網頁
app.get('/comments/:id', (req, res) => {
        const { id } = req.params
        const comment = comments.find(c => c.id === id)
        res.render('comments/show', { comment })
    })
    //顯示單一id comment的網頁
app.patch('/commments/:id', (req, res) => {
        const { id } = req.params;
        const newCommentTect = req.body.comment
        const foundComment = comments.find(c => c.id === id)
        foundComment.comment = newCOmmentText;
        res.redirect('/comments')
    })
    //要求更新訊息的網頁
app.get('/comments/:id/edit', (req, res) => {
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', comment)
})
app.use(express.json)
app.listen(8080, () => {
        console.log("test sever!")
    })
    //HTTP method 
    /*
    1.Get 
    2.Put update the all current representation of the target resource
    3.Post 
    4.Delete 
    5.Patch*/