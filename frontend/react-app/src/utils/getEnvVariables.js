
export const getEnvVariables = () => {

    process.env;

    return {
        ...process.env, // current env variables from linux 
        MAX_RECORDS_PAGE: 5
    }
}