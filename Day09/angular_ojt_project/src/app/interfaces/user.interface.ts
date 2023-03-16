export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    gender: string;
    team: string;
    role: string;
    hobby: string[];
    dob: Date;
    desc: string;
    createdAt: Date;
}
