import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

import crypto from 'crypto'

import { hash } from "bcryptjs";

import nodemailer from 'nodemailer';

class ForgotPasswordUserService {
    async execute(email: string) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        if(!email) {
            throw new Error("Invalid Email");
        }

        const userExists = await usersRepositories.findOne({
            email
        });

        if(!userExists) {
            throw new Error("user email doesnt exists");
        }

        const token = await hash(crypto.randomBytes(16).toString('base64'), 8);

        const user = usersRepositories.update({
            id: userExists.id
        }, {
            redefine_password_token: token
        });

        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "f15ab5a1850dc0",
              pass: "f696defcb1aa9e"
            }
        });
        
        transporter.sendMail({
            from: 'Administrador <3188cca5e2-aef4c5@inbox.mailtrap.io>',
            to: 'lucasspagnolobombana@gmail.com',
            subject: 'Troca de senha',
            html: `<p>Olá! Recebemos sua solicitação de troca de senha, por favor clique <a href="localhost:3000/change-password?token=${token}">aqui</a> para continuar...</p>`
        }).then(
            () => {
                //return 'Email enviado com sucesso!';
            }
        ).catch(
            () => {
                throw new Error("Email not sended");
            }
        );

        return token;
    } 
}

export { ForgotPasswordUserService }