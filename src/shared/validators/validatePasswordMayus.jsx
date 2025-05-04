export const validateMayuscula = (contraseñaT) => {
    const regex = /[A-Z]/

    return regex.test(contraseñaT);
}

export const validateMayusculaMessage = 'La contraseña necesita como minimo una letra Mayuscula'