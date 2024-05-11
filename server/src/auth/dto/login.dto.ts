import { IsString } from "class-validator";

export class loginDto{
    mail: string;
    
    @IsString()
    password: string;
}