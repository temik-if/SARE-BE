import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;
    
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async sendPasswordResetEmail(to: string, token: string) {
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 500px; background: #ffffff; padding: 20px; margin: auto; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                    <h2 style="color:rgb(255, 102, 0); text-align: center;">Redefinição de Senha</h2>
                    <p>Olá,</p>
                    <p>Você solicitou a redefinição da sua senha. Clique no botão abaixo para continuar:</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="https://your-app.com/reset-password?token=${token}" 
                           style="background-color: rgb(255, 102, 0); color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                            Redefinir Senha
                        </a>
                    </div>
                    <p>Se o botão acima não funcionar, copie e cole o seguinte link no seu navegador:</p>
                    <p style="word-wrap: break-word; background-color: #f8f9fa; padding: 10px; border-radius: 5px; font-weight: bold;">
                        https://your-app.com/reset-password?token=${token}
                    </p>
                    <p>Se você não solicitou essa alteração, apenas ignore este e-mail.</p>
                    <p style="text-align: center; font-size: 12px; color: #777;">© 2025 Sua Empresa. Todos os direitos reservados.</p>
                </div>
            </div>`;

        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: 'Solicitação de Redefinição de Senha - SARE',
            html: htmlContent
        });
    }
}