export const validatecontrasenaT = (contrasenaT) => {
    const regex = /^\S{8,12}$/

    return regex.test(contrasenaT)
}

export const validatecontrasenaTMessage = 'El password debe contener entre 8 y 12 caracteres sin espacios'

