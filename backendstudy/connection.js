const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://LindaLukos:Xt3MdYKNGksCJNOb@cluster0.scq2s8q.mongodb.net/study?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
console.log("DB is connected");
}).catch(()=>{
console.log("DB is not connected");
})