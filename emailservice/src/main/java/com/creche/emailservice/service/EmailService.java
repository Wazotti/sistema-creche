package com.creche.emailservice.service;

import com.creche.emailservice.model.events.ChildCheckedInEvent;
import com.creche.emailservice.model.events.ChildCheckedOutEvent;
import com.creche.emailservice.model.events.StatusUpdatedEvent;
import com.creche.emailservice.model.events.UnauthorizedPickupAttemptEvent;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public void enviarCheckin(ChildCheckedInEvent evento) {
        System.out.println("[EMAIL SIMULADO] ✅ Check-in realizado: " + evento.getNomeCrianca() + " às " + evento.getHora());
    }

    public void enviarCheckout(ChildCheckedOutEvent evento) {
        System.out.println("[EMAIL SIMULADO] 🧾 Check-out: " + evento.getNomeCrianca() + " por " + evento.getRetiradoPor() + " às " + evento.getHora());
    }

    public void enviarStatus(StatusUpdatedEvent evento) {
        System.out.println("[EMAIL SIMULADO] 📍 Status atualizado: " + evento.getDescricao());
    }

    public void enviarAlerta(UnauthorizedPickupAttemptEvent evento) {
        System.out.println("[EMAIL SIMULADO] ❌ Tentativa de retirada não autorizada: " + evento.getNomeCrianca());
    }
}