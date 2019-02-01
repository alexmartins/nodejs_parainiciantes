/*
0 Obter um usuario
1 Obter o numero de telefone de um usuario a partir do seu Id
2 Obter o endereco do usuario pelo Id
*/

// importamos um modulo interno do node.js
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario(){
    // quando der algum problema -> reject (ERRO)
    // quando sucess -> RESOLV
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(function(){
            // return reject(new Error('!!!DEU RUIM DE VERDADE!!!'))

            return resolve( {
                id:  1,
                nome: 'Aladin',
                dataNascimento: new Date()
            });
        }, 1000);
    });
}

function obterTelefone(idUsuario){
    return new Promise(function resolverPromise(resolve, reject){
        setTimeout(() => {
            return resolve({
                numero: '940737633',
                ddd: 11
            })
        }, 2000);
    })
}

function obterEndereco(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            rua: 'Rua dos Bobos',
            numero: 0
        })
    }, 2000);
}

const usuarioPromise = obterUsuario();
// para manipular o sucesso usando a funcao .then
// para manipular error, usamos o .catch
usuarioPromise
    .then(function(usuario){
        return obterTelefone(usuario.id)
            .then(function resolverTelefone(result){
                return {
                    usuario:{
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone:  result
                }
            })
    })  

    .then(function (resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id);
        return endereco.then(function resolverEndereco(result){
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        });
    })

    .then(function(resultado){
        console.log(
`           Nome: ${resultado.usuario.nome}
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.numero}
        `);
    })

    .catch(function(erro){
        console.error('DEU RUIM ', erro)
    })
