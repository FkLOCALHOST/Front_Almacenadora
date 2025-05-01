export const validatePhone = (telefonoT) => {
    const regex = /^\S{8,8}$/

    return regex.test(telefonoT)
}

export const validatePhoneMessage = 'El telefono debe tener 8 caracteres sin espacion ni guiones'