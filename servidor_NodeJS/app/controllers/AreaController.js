const connection = require('../config/db')
const { validationResult } = require('express-validator')

exports.listar_area = (req, res) => {

  const query = "select * from area"

  connection.query(query , (err, rows) =>{
      if(err){
          res.status(500)
          res.json({ "message" : "Internal Server Error" })
          console.log(err)
      }else if(rows.length > 0){
          res.status(200)
          res.json(rows)
      }else{
          res.status(404)
          res.json({ "message": "Nenhuma Área Encontrada" })
      }
  })
}

// Listar área por Id 
exports.listar_area_por_id = (req, res) =>{
    const erros = validationResult(req)
    if(!erros.isEmpty()){
        return res.status(422).json({"erros": erros.array()})
    }else{
        const id  = req.params.id
        const query = "select * from area where id = ?"

        connection.query(query, [id], (err, rows)=>{
            if(err){const erros = validationResult(req)
                if(!erros.isEmpty()){
                    return res.status(422).json({"erros": erros.array()})
                }
                res.status(500)
                res.json({ "message": "Internal Server Error" })
                console.log(err)
            }else if(rows.length > 0){
                res.status(200)
                res.json(rows)
            }else{
                res.status(404)
                res.json({ "message": "Nenhuma Área Encontrada" })
            }
        })
    }
}

exports.alterar_area = (req, res) => {

  const erros = validationResult(req)
  if (!erros.isEmpty()){
    return res.status(422).json({"erros": erros.array()})
  } else {

    const area = []
    area.push(req.body.nome)
    area.push(req.body.descricao)
    area.push(req.body.id_tipo_area)
    area.push(req.params.id)

    const query = "update area set nome = ?, descricao = ?, id_tipo_area = ?  where id = ?"

    connection.query(query, area, (err, rows) => {
        if (err){
        res.status(500)
        res.json({ "message": "Internal Server Error" })
        console.log(err)
      } else if (rows.affectedRows > 0){
        res.status(202)
        res.json({ "message": "Área alterada", "id": req.params.id })
      } else {
        res.status(404)
        res.json({ "message": "Nenhuma área cadastrada com esse id" })
      }
    })
  }
}

exports.excluir_area = (req, res) => {
  const erros = validationResult(req)

  if (!erros.isEmpty()) {
    return res.status(422).json({"erro":erros.array()})
  }else{
  const id = req.params.id

  const query = "delete from area where id = ? "

  connection.query(query, id, (err, rows) => {
    if (err){
      res.status(500)
      res.json({ "message": "Internal Server Error" })
      console.log(err)
    } else if (rows.affectedRows > 0){
      res.status(200)
      res.json({ "message": "Área excluída", "id": id })
    } else {
      res.status(404)
      res.json({"message": "Área não encontrada"})
    }
  })
}
}

exports.criar_area = (req, res) =>{

  const erros = validationResult(req)
  if(!erros.isEmpty()){
      return res.status(422).json({"erros":erros.array()})
  }else{
     const area = []

     area.push(req.body.nome)
     area.push(req.body.descricao)
     area.push(req.body.id_tipo_area)

     const query = 'insert into area(nome,descricao,id_tipo_area) values(?,?,?)'

     connection.query(query,area, (error, rows) =>{
         if(error){
             res.status(500).json({ "message":"Internal Server Error" })
             console.log(error)
         }else{
             res.status(201).json({ "message":"Área criada com sucesso!","id":rows.insertId })
         }
     }) 
  }
}
