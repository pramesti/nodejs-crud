const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const DBurl = "mongodb://127.0.0.1:27017";
const DBname = "data_coba";

let dbo = null;

MongoClient.connect(DBurl, (error,db) =>{
    if(error) throw error;
    dbo=db.db(DBname);
});

app.get('/coba',(request,response) =>{
    dbo.collection("data").find().toArray((err, res)=> {
        if(err) throw err;
        response.json(res);
    })
});

app.delete('/hapus/:id', (request, response) =>{
    let id = request.params.id;
    let id_object = new ObjectID(id);
    dbo.collection("data").deleteOne({//perintah hapus mongodb
    _id : id_object //mengambil id data untuk dihapus
}, (err,res)=>{
    if(err) throw err;
    response.end("data berhasil dihapus");
})
})

app.use(bodyParser.urlencoded({extended:false}))

app.get('/siswa/:nama', (request, response)=> {
    let namaSiswa = request.params.nama;
    response.end("menampilkan nama siswa " + namaSiswa);
});

app.post('/siswa', (request, response)=>{
    let namaSiswa = request.body.name;
    let alamat = request.body.adress;
    response.end('menampilkan siswa baru ' + namaSiswa + ',yang beralamat di ' + alamat);
});

app.delete('/siswa/:id', (request, response)=>{
    let id = request.params.id;
    let namaSiswa = request.body.nama;
    response.end('id ' + id + 'telah dihapus, dengan nama: ' +namaSiswa);
});

app.put('/coba/:id', (request, response)=>{
    let id = request.params.id;
    let id_object = new ObjectID(id);
    let namaSiswa= request.body.nama;
    dbo.collection("data").updateOne({
        _id:id_object       //mengambil data yang akan di edit berdasarkan id
    }, {$set:{
        nama: namaSiswa
    }},
    (err, res)=>{
        if(err) throw err;
        response.end("data berhasil di update");

    }) 
})

app.put('/siswa/:id', (request, response)=>{
    let id = request.params.id;
    let namaSiswa = request.body.nama;
    let alamat = request.body.alamat;
    response.end('siswa dengan id: ' + id + ' telah di update')
});


app.listen('8000');