require('colors');
require('dotenv').config();
const mysql = require('mysql2');
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

const showLogin = (conn) => {
  return new Promise(resolve => {
    console.clear();

    const readLine = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readLine.question("Ingrese su correo: ", async email => {

      const [output] = await conn.query(
        `select * from usuario where email = ? and role = "admin"`,
        [email]
      );
      let [users] = output;
      if (!users || users.length === 0) {
        readLine.close();
        return resolve("Usuario o contraseña incorrecta");
      }
      readLine.question("Ingrese su contraseña: ", password => {
        bcrypt.compare(password, users.password, (err, result) => {
          if (err || !result) {
            console.error(err);
            readLine.close();
            resolve("Usuario o contraseña incorrecta");
            return;
          }

          readLine.close();
          resolve({ user: users });
        });
      })
    });
  });
}

const showmenu = () => {

  return new Promise(resolve => {

    console.clear();
    console.log("================================================================".green);
    console.log("BIENVENIDO AL GENERADOR DE TOKEN PARA REGISTRO DE ARDMINISTRADOR".green);
    console.log("================================================================".green);

    console.log(`${'1.'.green} Generar token`);
    console.log(`${'0.'.green} Salir`);

    const readLine = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readLine.question("\nSu elección: ", opt => {
      readLine.close();
      resolve(opt);
    });

  })
}

const pause = (showMsg = false) => {

  return new Promise(resolve => {

    const readLine = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readLine.question(`Presione ${'ENTER'.green} para continuar`, _ => {
      readLine.close();
      resolve();
    });

  })
}
const main = async () => {
  let opcion = null;


  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
  });
  const connection = pool.promise();


  let session = await showLogin(connection);
  // si fallo se cierra
  if (!session.user) {
    console.log(session);
    await pause();
  }
  while (session.user && opcion !== '0') {
    opcion = await showmenu();

    // resolving actions
    switch (opcion) {
      case '0': opcion = '0'; break;
      case '1': {
        let token = uuidv4();
        try {
          await connection.query(
            'insert into token values(?,?, 1)',
            [token, session.user.__id]
          );

          console.log("\nTOKEN:".green, token);
          console.log("WARNING:".red, "Este token provee privilegios de administrador, su correcto uso es responsabilidad de", session.user.nombre, session.user.apellido, "\n");
        } catch (err) {
          console.error(err);
          console.log();
          console.log("Hubo un error. Reintente.");
        }
      }; break;
    }
    await pause();
  }
  await connection.end();
}

main();
