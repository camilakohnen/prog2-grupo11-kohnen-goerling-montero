var express = require('express');
var router = express.Router();
var profileController = require("../controllers/profileController");
//var indexController = require("../controllers/indexController");
const { body } = require ("express-validator");
const db = require("../database/models")

let validacionesRegistracion = [
    body("mail")
      .notEmpty().withMessage("Debe completar el mail").bail()
      .isEmail().withMessage("Debe completar con un email válido")
      .custom(function(results){
        return db.Usuario.findOne({
            where: {mail: results},
        })
        .then(function(mail){
            if (mail){
                throw new Error("El mail ingresado ya existe")
            }
        })
    }),
    body("contrasenia")
      .notEmpty().withMessage("Debe poner una contraseña").bail()
      .isLength({min:4}).withMessage("La contraseña debe ser más larga"),
    body("fecha")
      .notEmpty().withMessage("Debe completar este campo").bail(),
    body("dni")
      .notEmpty().withMessage("Debe completar el documento").bail()
      .isLength({min:7}).withMessage("Debe ingresar un documento válido"),
]

let validacionesLogin = [
    body("mail")
        .custom(function(results){
            return db.Usuario.findOne({
                where: {mail: results},
            })
            .then(function(mail){
                if (!mail){
                    throw new Error("El mail ingresado no existe")
                }
            })
        }),
    body("contrasenia")
        .custom(function(results){
            return db.Usuario.findOne({
                where: {contrasenia: results}, 
            })
            .then(function(contrasenia){
                if (contrasenia == undefined){
                    throw new Error("La contraseña ingresada no existe")
                }
            })
        })
]

let validacionesEdit = [
    body("mail")
      .isEmail().withMessage("Debe completar con un email válido").bail(),
    body("contrasenia")
      .optional({ checkFalsy: true })
      .isLength({min:4}).withMessage("Para cambiar la contraseña debe ingresar una más larga"),
    body("fecha")
      .notEmpty().withMessage("Debe completar este campo").bail(),
    body("dni")
      .notEmpty().withMessage("Debe completar el documento").bail()
      .isLength({min:7}).withMessage("Debe ingresar un documento válido"),
  ]

router.get("/id/:id" , profileController.profile);

router.get("/edit/:id" , profileController.edit);

router.post("/edit/:id" , validacionesEdit, profileController.editPost);

router.get("/register" , profileController.register);

router.post("/register" , validacionesRegistracion, profileController.store);

router.get("/login" , profileController.login);

router.post("/login" , validacionesLogin, profileController.loginpost);

router.post('/logout', profileController.logOut);

module.exports = router;