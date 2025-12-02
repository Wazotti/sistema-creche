package com.creche.emailservice.controller;

import com.creche.emailservice.config.RabbitMQConfig;
import com.creche.emailservice.model.events.ChildCheckedInEvent;
import com.creche.emailservice.model.events.ChildCheckedOutEvent;
import com.creche.emailservice.model.events.StatusUpdatedEvent;
import com.creche.emailservice.model.events.UnauthorizedPickupAttemptEvent;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mensagem")
public class MensagemController {

    private final RabbitTemplate rabbitTemplate;

    public MensagemController(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @PostMapping("/checkin")
    public String enviarCheckin(@RequestBody ChildCheckedInEvent evento) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.CHECKIN_QUEUE, evento);
        return "Evento de check-in enviado: " + evento.getNomeCrianca();
    }

    @PostMapping("/checkout")
    public String enviarCheckout(@RequestBody ChildCheckedOutEvent evento) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.CHECKOUT_QUEUE, evento);
        return "Evento de check-out enviado: " + evento.getNomeCrianca();
    }

    @PostMapping("/status")
    public String enviarStatus(@RequestBody StatusUpdatedEvent evento) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.STATUS_QUEUE, evento);
        return "Evento de status enviado: " + evento.getDescricao();
    }

    @PostMapping("/alerta")
    public String enviarAlerta(@RequestBody UnauthorizedPickupAttemptEvent evento) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.UNAUTHORIZED_QUEUE, evento);
        return "Evento de alerta enviado: tentativa de retirada de " + evento.getNomeCrianca();
    }
}