
export const getEnvVariables = () => {

    import.meta.env;

    return {
        ...import.meta.env, // current env variables from linux 
        MAX_RECORDS_PAGE: 20
    }
}