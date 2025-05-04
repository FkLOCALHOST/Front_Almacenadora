export const validateMinuscula = (contraseñaT) => {
    const regex = /[a-z]/

    return regex.test(contraseñaT)
}

export const validateMinusculaMessage = 'La contrasela necesita como minimo una letra minuscula'