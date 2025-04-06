import { RequestHandler } from 'express';
import { pool } from '../db/sqlserver';

export const signUp: RequestHandler = async (req, res, next) => {
  try {
    // Desestructuramos los datos del cuerpo de la solicitud
    const { email, password, name, dob } = req.body;

    // Verificamos que los campos obligatorios estén presentes
    if (!email || !password || !name) {
      res.status(400).json({ message: 'Email, contraseña y nombre son requeridos' });
      return;
    }

    // Verificamos si el email ya está registrado
    const result = await pool.request()
      .input('email', email)
      .query('SELECT * FROM Owners WHERE email = @email');

    if (result.recordset.length > 0) {
      res.status(400).json({ message: 'Este email ya está registrado' });
      return;
    }

    // Insertamos los datos del nuevo propietario sin especificar OwnerID (lo genera la BD)
    await pool.request()
      .input('email', email)
      .input('password', password)
      .input('name', name)
      .input('dob', dob || null)  // DOB es opcional
      .query('INSERT INTO Owners (Email, Password, Name, DOB) VALUES (@email, @password, @name, @dob)');

    // Respondemos que el registro fue exitoso
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Verificamos que los campos obligatorios estén presentes
    if (!email || !password) {
      res.status(400).json({ message: 'Email y contraseña son requeridos' });
      return;
    }

    // Buscamos al usuario por el email
    const result = await pool.request()
      .input('email', email)
      .query('SELECT * FROM Owners WHERE email = @email');

    const user = result.recordset[0];

    // Verificamos si el usuario existe
    if (!user) {
      console.log('No user found');
      res.status(401).json({ message: 'Credenciales incorrectas' });
      return;
    }

    // Agrega logs para ver los valores
    //console.log('User from DB:', user); // Para ver todo el objeto de usuario
    //console.log('Password field from DB:', user.Password); // Ver la contraseña correctamente accedida
    //console.log('Password provided:', password); // Ver la contraseña que enviaste en la solicitud

    // Verificamos si la contraseña es correcta
    if (user.Password !== password) {
      res.status(401).json({ message: 'Credenciales incorrectas' });
      return;
    }

    // Respondemos con un mensaje de login exitoso
    res.status(200).json({ message: 'Login exitoso', user: { email: user.Email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
