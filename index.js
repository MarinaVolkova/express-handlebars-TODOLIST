const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const todosRout = require('./routes/todos');


const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
  defaultLayout:'main',
  extname:'hbs'
})

app.engine('hbs',hbs.engine); //задается настройка Node.js handlebar
app.set('view engine','hbs') //путь к директории, в которой находятся шаблоны;
app.set('views','views')//указание самого шаблонизатора.

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public'))) //подключение к сатитческой папке из которой берём файлы, у нас это стили
app.use(todosRout)


async function start(){
  try{
    await mongoose.connect('mongodb+srv://marina:ican1999eat@cluster0.zbmt0.mongodb.net/todos',{ //плдключение к БД
      useNewUrlParser: true,
      useFindAndModify:false,
    })
    app.listen(PORT,()=>{ //запускаем сервер
      console.log('Server started...')
    })
  }catch(e){
    console.log(e)
  }
}

start()