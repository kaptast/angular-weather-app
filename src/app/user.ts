export class User {
    id: number;
    username: string;
    password: string;

    constructor(name: string, password: string) {
        this.username = name;
        this.password = password;
    }
}