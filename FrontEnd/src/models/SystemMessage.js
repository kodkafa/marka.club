import {observable} from 'mobx';

export class SystemMessage {

    @observable isDisplayed = false;

    constructor(data) {

        this.status = data.status;
        this.code = data.code;
        this.message = data.message;
        this.isDisplayed = false;
        this.createdAt = data.createdAt;

    }

    hide = () => this.isDisplayed = true;

    hideTimeout = (timeout = 10000) => {
        setTimeout(() => this.hide(), timeout)
    };

}
