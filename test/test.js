/* eslint-env node, mocha */
/* eslint-disable no-console */

if(process.env.NODE_ENV !== 'test') {
  //Por el amor de dios solo ejecutar esto en ambiente de prueba
  console.error("QUE CHUCHA CREES QUE HACES?",
  "QUIERES BORRAR TODA LA BASE DE PRODUCCION?",
  "DEBES DE EJECUTAR ESTO CON NODE_ENV=test")
  process.exit(1)
}
const assert = require('assert');
const chai = require('chai')
  , expect = chai.expect
  , should = chai.should();

const db = require("../backend/dbAdmin.js")

describe('metodos de dbAdmin.js', function () {

  describe('insertarProducto', function () {

    it("persiste varios productos en la base encadenando con promise", function (done) {
      db.insertarProducto("fsers4", "producto A", 9.99, 14.99)
      .then(function (ids) {
        ids.should.not.be.empty
        ids[0].should.be.a('number')
        return db.insertarProducto("gfdtt", "producto B", 19.99, 24.99)
      }).then(function (ids) {
        ids.should.not.be.empty
        ids[0].should.be.a('number')
        return db.insertarProducto("gfgtb4", "producto C", 14.99, 18.99)
      }).then(function (ids) {
        ids.should.not.be.empty
        ids[0].should.be.a('number')
        done()
      })
    })

  })

  describe('insertarCliente', function() {

    it('persiste varios clientes en la base encadenando con promise', function (done) {
      db.insertarCliente("0954236576001", "Dr. Juan Perez", "Calle 13", "", "")
      .then(function (ids) {
        ids.should.not.be.empty
        ids[0].should.be.a('number')
        return db.insertarCliente("0934233576001", "Carlos Sanchez", "Calle 16", "", "")
      }).then(function(ids) {
        ids.should.not.be.empty
        ids[0].should.be.a('number')
        done()
      })

    })

  })

  describe('insertarVenta', function() {

    it('persiste una nueva venta en la base y agrega las unidades vendidas a la base',
      function (done) {
        const productosVendidos = [
          {
            rowid: 1,
            expiracion: new Date(),
            cantidad: 1,
          },
          {
            rowid: 2,
            expiracion: new Date(),
            cantidad: 2,
          },
          {
            rowid: 3,
            expiracion: new Date(),
            cantidad: 3,
          },
        ]
        db.insertarVenta('gfg5', 1, new Date(), 35.00, 0, 3.12, 38.12, productosVendidos)
        .then(function (res) {
          const lasInsertedId = res[0]
          lasInsertedId.should.be.equal(6)
          db.close()
          done()
        })
      })
  })

})