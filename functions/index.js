const functions = require('firebase-functions');
const admin = require('firebase-admin');


// Fetch the service account key JSON file contents
var serviceAccount = require("../functions/trakker-acdbc-firebase-adminsdk-4817s-14f3e79c37.json");

// Initialize the app with a custom auth variable, limiting the server's access
admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://trakker-acdbc.firebaseio.com/"
});

// The app only has access as defined in the Security Rules
var db = admin.database();
var ref = db.ref("/app-logistica");


/*
ref.once("value", function (snapshot) {
        console.log(snapshot.val());
});*/







exports.updateapp = functions.https.onRequest((req, res) => {

        ruta = req.body.ruta

        ref.update({
                ruta: {
                        "data": {
                                "servicio": true
                        }
                }
        }).then((ok) => {
                return res.status(200).json({
                        "status": true,
                        "message": "Se termino de ejecutar con éxito",
                        "ruta": "ser inserto" + ok
                })
        }).catch((err) => {
                return res.status(500).json({
                        "status": false,
                        "message": "No se pudo insertar",
                        "err": err.message
                })
        });


});




