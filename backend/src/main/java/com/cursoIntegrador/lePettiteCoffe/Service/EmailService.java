package com.cursoIntegrador.lePettiteCoffe.Service;

import java.io.File;
import java.io.IOException;

import org.apache.commons.mail.EmailAttachment;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.MultiPartEmail;
import org.springframework.stereotype.Service;

import com.cursoIntegrador.lePettiteCoffe.Util.PdfGenerator;

@Service
public class EmailService {

    public void enviarTokenDeRecuperacion(String destinatario, String token) throws EmailException {
        File pdf;

        try {
            pdf = PdfGenerator.generarPdfRecuperacion(destinatario, token);
        } catch (IOException e) {
            throw new RuntimeException("Error generando el PDF de recuperación", e);
        }

        MultiPartEmail email = new MultiPartEmail();
        email.setHostName("smtp.gmail.com");
        email.setSmtpPort(587);
        email.setAuthentication("uedu806@gmail.com", "uums nowg qjws vcaa");
        email.setStartTLSEnabled(true);

        email.setFrom("uedu806@gmail.com");
        email.setSubject("Recuperación de contraseña");
        email.setMsg("Tu token de recuperación es: " + token
                + "\nVálido por 10 minutos. \n pegalo en el formulario de recuperación de contraseña. \n Si no fuiste tú quien solicitó este correo, ignóralo y cambia tu contraseña por seguridad.");
        email.addTo(destinatario);

        EmailAttachment attachment = new EmailAttachment();
        attachment.setPath(pdf.getAbsolutePath());
        attachment.setDisposition(EmailAttachment.ATTACHMENT);
        attachment.setDescription("Detalles de recuperación de contraseña");
        attachment.setName("Recuperacion_LePettiteCoffee.docx");

        email.attach(attachment);

        email.send();

        pdf.deleteOnExit();

    }
}
