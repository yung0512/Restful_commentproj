const express = require('express');
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


let comments = [{
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
app.get('/comments/new', (req, res) => {
        res.render('comments/new');
    })
    //處理提出新訊息的網頁
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})
app.post('/comments', (req, res) => {
        const { username, comment } = req.body;
        const mes = req.body;
        comments.push({ username, comment, id: uuid() });
        res.redirect('/comments')
    })
    //從/comments/new的form表格提出的post請求並更新comment 需要重新導向至其他網頁不然會重複送出一樣的訊息

app.get('/comments/:id', (req, res) => {
        const { id } = req.params;
        const comment = comments.find(c => c.id === id);
        res.render('comments/show', { comment })
    })
    //顯示單一id comment的網頁
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);

    //get new text from req.body
    const newCommentText = req.body.comment;
    //update the comment with the data from req.body:
    foundComment.comment = newCommentText;
    //redirect back to index (or wherever you want)
    res.redirect('/comments')
})

//要求更新訊息的網頁

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id)
    comments = comments.filter(c => c.id !== id) //return a new array
})

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