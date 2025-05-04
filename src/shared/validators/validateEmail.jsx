export const validateEmail = (correoT) => {
    const regex = /\S+@\S+\.\S+/;

    return regex.test(correoT)
}

export const validateEmailMessage = 'Ingesa un correo válido'

