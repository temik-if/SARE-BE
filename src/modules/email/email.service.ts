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

    async sendActivationEmail(to: string, code: string) {
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
                <div style="max-width: 600px; background: #ffffff; padding: 40px; margin: auto; border-radius: 8px; box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);">
                    <h2 style="color:rgb(255, 102, 0); text-align: center; font-size: 28px;">Ativação de Conta</h2>
                    <p style="font-size: 16px;">Olá,</p>
                    <p style="font-size: 16px;">Bem-vindo ao <strong>SARE</strong>! Para ativar sua conta, utilize o código abaixo:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <p style="font-size: 30px; font-weight: bold; color: rgb(255, 102, 0); padding: 10px 30px; border-radius: 8px; background-color: #f4f4f4;">${code}</p>
                    </div>
                    <p style="font-size: 16px;">Insira esse código na página de ativação para concluir o processo.</p>
                    <p style="font-size: 16px;">O código expira em <strong>6 horas</strong>.</p>
                    <p style="text-align: center; font-size: 12px; color: #777; margin-top: 40px;">© 2025 SARE. Todos os direitos reservados.</p>
                </div>
            </div>`;

        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: 'Ativação de Conta - SARE',
            html: htmlContent
        });
    }

    async sendPasswordResetEmail(to: string, code: string) {
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
                <div style="max-width: 600px; background: #ffffff; padding: 40px; margin: auto; border-radius: 8px; box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);">
                    <h2 style="color:rgb(255, 102, 0); text-align: center; font-size: 28px;">Redefinição de Senha</h2>
                    <p style="font-size: 16px;">Olá,</p>
                    <p style="font-size: 16px;">Você solicitou a redefinição da sua senha. Utilize o código abaixo para continuar:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <p style="font-size: 30px; font-weight: bold; color: rgb(255, 102, 0); padding: 10px 30px; border-radius: 8px; background-color: #f4f4f4;">${code}</p>
                    </div>
                    <p style="font-size: 16px;">Insira esse código na página de redefinição de senha para concluir o processo.</p>
                    <p style="font-size: 16px;">O código expira em <strong>6 horas</strong>.</p>
                    <p style="font-size: 16px;">Se você não solicitou essa alteração, apenas ignore este e-mail.</p>
                    <p style="text-align: center; font-size: 12px; color: #777; margin-top: 40px;">© 2025 SARE. Todos os direitos reservados.</p>
                </div>
            </div>`;

        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: 'Redefinição de Senha - SARE',
            html: htmlContent
        });
    }

    async sendBookingConfirmationEmail(to: string, bookingDetails: any, resourceName: string) {
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
                <div style="max-width: 600px; background: #ffffff; padding: 40px; margin: auto; border-radius: 8px; box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);">
                    <h2 style="color:rgb(255, 102, 0); text-align: center; font-size: 28px;">Confirmação de Agendamento</h2>
                    <p style="font-size: 16px;">Olá,</p>
                    <p style="font-size: 16px;">Seu agendamento foi realizado com sucesso! Aqui estão os detalhes:</p>
                    <div style="margin: 30px 0;">
                        <p style="font-size: 16px;">Recurso: <strong>${resourceName}</strong></p>
                        <p style="font-size: 16px;">Data: <strong>${bookingDetails.date}</strong></p>
                        <p style="font-size: 16px;">Turno: <strong>${bookingDetails.shift}</strong></p>
                        <p style="font-size: 16px;">Aula(s): <strong>${bookingDetails.class.join(', ')}</strong></p>
                    </div>
                    <p style="font-size: 16px;">Caso precise alterar ou cancelar, acesse sua conta.</p>
                    <p style="font-size: 12px; color: #777; margin-top: 40px; text-align: center;">© 2025 SARE. Todos os direitos reservados.</p>
                </div>
            </div>`;
    
        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: 'Confirmação de Agendamento - SARE',
            html: htmlContent
        });
    }

    async sendBookingCancellationEmail(to: string, bookingDetails: any, resourceName: string) {
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
                <div style="max-width: 600px; background: #ffffff; padding: 40px; margin: auto; border-radius: 8px; box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);">
                    <h2 style="color:rgb(255, 102, 0); text-align: center; font-size: 28px;">Cancelamento de Agendamento</h2>
                    <p style="font-size: 16px;">Olá,</p>
                    <p style="font-size: 16px;">Seu agendamento foi cancelado. Aqui estão os detalhes:</p>
                    <div style="margin: 30px 0;">
                        <p style="font-size: 16px;">Recurso: <strong>${resourceName}</strong></p>
                        <p style="font-size: 16px;">Data: <strong>${bookingDetails.date}</strong></p>
                        <p style="font-size: 16px;">Turno: <strong>${bookingDetails.shift}</strong></p>
                        <p style="font-size: 16px;">Aula(s): <strong>${bookingDetails.class.join(', ')}</strong></p>
                    </div>
                    <p style="font-size: 16px;">Se precisar reagendar, entre em contato conosco.</p>
                    <p style="font-size: 12px; color: #777; margin-top: 40px; text-align: center;">© 2025 SARE. Todos os direitos reservados.</p>
                </div>
            </div>`;
    
        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: 'Cancelamento de Agendamento - SARE',
            html: htmlContent
        });
    }

    async sendBookingCancellationNotificationToCoordinator(to: string[], bookingDetails: any, userDetails: any, resourceName: string) {
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px;">
                <div style="max-width: 600px; background: #ffffff; padding: 40px; margin: auto; border-radius: 8px; box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);">
                    <h2 style="color:rgb(255, 102, 0); text-align: center; font-size: 28px;">Notificação de Cancelamento de Agendamento</h2>
                    <p style="font-size: 16px;">Olá,</p>
                    <p style="font-size: 16px;">Um agendamento foi cancelado. Aqui estão os detalhes:</p>
                    <div style="margin: 30px 0;">
                        <p style="font-size: 16px;">Usuário: <strong>${userDetails.full_name}</strong></p>
                        <p style="font-size: 16px;">Recurso: <strong>${resourceName}</strong></p>
                        <p style="font-size: 16px;">Data: <strong>${bookingDetails.date}</strong></p>
                        <p style="font-size: 16px;">Turno: <strong>${bookingDetails.shift}</strong></p>
                        <p style="font-size: 16px;">Aula(s): <strong>${bookingDetails.class.join(', ')}</strong></p>
                    </div>
                    <p style="font-size: 16px;">Por favor, revise as informações para tomar as providências necessárias.</p>
                    <p style="font-size: 12px; color: #777; margin-top: 40px; text-align: center;">© 2025 SARE. Todos os direitos reservados.</p>
                </div>
            </div>`;
    
        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: 'Cancelamento de Agendamento - SARE',
            html: htmlContent
        });
    }    
}