const express= require('express');
const app = express();
const hbs = require('hbs');
require('dotenv').config();
const Port = process.env.PORT || 8080;
const mysql2= require('mysql2');
const path = require('path');
const { error } = require('console');

const conexion = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "Holasofe09!",
    port: 3306,
    database: "astro",
});

const conectar = (
    conexion.connect((error)=>{
        if(error) throw error;
        console.log('base de datos conectada!!!');
    })
    ); 



app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
    res.send('conectado a la base de datos');

    });
    app.get('/', (req, res) => {
        res.render('index', {titulo:'Bienvenido a Pluton en linea'});

    });


    app.get('/contacto', (req, res) => {
        res.render('contacto', {titulo:'rellena el siguiente formulario'});

    });

    //verbo post: para recibir datos, puede imprimirlo y/o enviarlo a la base de datos
    app.post('/contacto', (req, res) => {
        console.log(req.body);



        const {nombre, apellido, fechanac, email, motivo} = req.body;
        console.log(nombre);
        console.log(apellido);
        console.log(fechanac);
        console.log(email);
        console.log(motivo);

     //validacion basica

    if(nombre == "" || fechanac == "" || email == ""){
        let validacion = 'Faltan datos para finalizar';

        res.render('/contacto', {titulo:'envianos tu consulta'},
        validacion
        
        )}else{
            console.log(nombre, apellido, fechanac, email, motivo)
            res.send('index', {titulo:'Gracias!'});
        }

         //conexion a la base de datos "astro"
        let data = {
            contacto_nombre:nombre,
            contacto_apellido:apellido,
            contacto_fechanac:fechanac,
            contacto_email:email,
            contacto_motivo:motivo
        };
        let sql= "INSERT INTO UTN SET ?"

        let query = conexion.query (sql, data, (err, results) => {    
            if(error) throw error;
            
        //para que el usuario cargue datos y quede en la misma pagina:
        //tuve que comentar 1***
        res.render('contacto', {titulo:'rellena el formulario para tu consulta'})    
        })
    });

    app.listen(Port, ()=>{
        console.log(`Servidor corriendo en el puerto ${Port}`);  
    });

    app.on('error', (error) => {
        console.log(`Tenemos un error: ${error}`);  
    }); 


    //configuramos la vista de la aplicacion
    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname,'views'));
    console.log(__dirname)
    //sacamos de npm: hay que crear carpeta partials para utilizarlo
    hbs.registerPartials(path.join(__dirname, 'views/partials'));

