export const validatecontrasenaT = (contrasenaT) => {
    const regex = /^\S{6,12}$/

    return regex.test(contrasenaT)
}

export const validatecontrasenaTMessage = 'El password debe contener entre 6 y 12 caracteres sin espacios'

