export const nameRegex = /^(?:[A-ZÁÉÍÓÚ][a-záéíóú]+(?:\s[A-ZÁÉÍÓÚ][a-záéíóú]+){2,4})$/;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

export function validarCrearUsuario(nombre: string, correo: string, contrasenia: string, fecha_nacimiento: string,) {
  if (!nombre || !correo || !contrasenia || !fecha_nacimiento) return 'Todos los campos son obligatorios';
  if (!nameRegex.test(nombre)) return 'El nombre es inválido'
  if (!emailRegex.test(correo)) return 'El correo electrónico es inválido'
  if (contrasenia.length < 8) return 'La contraseña debe tener al menos 8 caracteres'
  if (!dateRegex.test(fecha_nacimiento)) return 'La fecha de nacimiento es inválida (formato YYYY-MM-DD)'

  return true;
}