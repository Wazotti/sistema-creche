package com.creche.emailservice.consumer;

import com.creche.emailservice.config.RabbitMQConfig;
import com.creche.emailservice.model.events.ChildCheckedInEvent;
import com.creche.emailservice.model.events.ChildCheckedOutEvent;
import com.creche.emailservice.model.events.StatusUpdatedEvent;
import com.creche.emailservice.model.events.UnauthorizedPickupAttemptEvent;
import com.creche.emailservice.service.EmailService;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmailEventListener {

    private final EmailService emailService;

    @RabbitListener(queues = RabbitMQConfig.CHECKIN_QUEUE)
    public void handleCheckin(ChildCheckedInEvent event) {
        System.out.println("Recebido: " + event);
        emailService.enviarCheckin(event);
    }

    @RabbitListener(queues = RabbitMQConfig.CHECKOUT_QUEUE)
    public void handleCheckout(ChildCheckedOutEvent event) {
        System.out.println("Recebido: " + event);
        emailService.enviarCheckout(event);
    }

    @RabbitListener(queues = RabbitMQConfig.STATUS_QUEUE)
    public void handleStatus(StatusUpdatedEvent event) {
        System.out.println("Recebido: " + event);
        emailService.enviarStatus(event);
    }

    @RabbitListener(queues = RabbitMQConfig.UNAUTHORIZED_QUEUE)
    public void handleUnauthorized(UnauthorizedPickupAttemptEvent event) {
        System.out.println("Recebido: " + event);
        emailService.enviarAlerta(event);
    }
}
