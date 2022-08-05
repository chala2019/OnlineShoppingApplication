import AxiosServices from "./AxiosServices";
import Configuration from "../configurationss/Configuration";

const axiosService = new AxiosServices(); //https://www.freecodecamp.org/news/how-to-use-axios-with-react How To Use Axios With React

export default class AuthServices {
    SignUp(data) {
        return axiosService.post(Configuration.SignUp, data, false);
    }

    SignIn(data) {
        return axiosService.post(Configuration.SignIn, data, false);
    }
}