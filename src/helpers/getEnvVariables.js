
//*Es una función que retorna mis vairables de entorno

export const getEnvVariables = () => {

  import.meta.env;

  return {
    ...import.meta.env
  }
}