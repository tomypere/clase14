import { body, validationResult } from "express-validator"
export const productDataValidator = [
    body("title")
        .isString().withMessage("El titulo tiene que ser un texto")
        .isEmpty().withMessage("El titulo es obligatorio")
        .isLength({ min: 3 }).withMessage("Tiene que tener al menos 3 caracteres"),
    body("description")
        .isString().withMessage("La descripcion tiene que ser un texto")
        .isEmpty().withMessage("La descripcion es obligatorio")
        .isLength({ min: 3 }).withMessage("Tiene que tener al menos 3 caracteres"),
    body("thumbnail")
        .isArray().withMessage("Tiene que ser un array"),
    body("code")
        .isString().withMessage("El titulo tiene que ser un texto")
        .isEmpty().withMessage("El titulo es obligatorio")
        .isLength({ min: 3 }).withMessage("Tiene que tener al menos 3 caracteres"),
    body("stock")
        .isNumeric().withMessage("Tiene que ser un numero")
        .isLength({min: 1}).withMessage("Tiene que tener al menos 1 caracter")
        .isEmpty().withMessage("El stock es obligatorio"),
    body("status")
        .isBoolean(),
    body("price")
        .isNumeric().withMessage("Tiene que ser un numero")
        .isLength({min: 1}).withMessage("Tiene que tener al menos 1 caracter")
        .isEmpty().withMessage("El precio es obligatorio"),
    body("category")
        .isString().withMessage("La categoria tiene que ser un texto")
        .isEmpty().withMessage("La categoria es obligatorio")
        .isLength({ min: 3 }).withMessage("Tiene que tener al menos 3 caracteres"),
        (req, res, next) => {
            const errors = validationResult(req)
    
            if(!errors.isEmpty()) {
                const formatErrors = errors.array().map(e => { 
                    return { msg: e.msg, data: e.path } 
                })
    
                return res.status(400).json({status:"error", errors: formatErrors})
            }
            next()
        }
]