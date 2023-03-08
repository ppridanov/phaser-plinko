import {Scene} from "phaser";

export default class Register extends Scene {
    register
    url

    constructor() {
        super({key: "Register"});
        this.url = null;
    }

    create() {

    }

    setUrl = (url) => {
        this.url = url;
    }
}