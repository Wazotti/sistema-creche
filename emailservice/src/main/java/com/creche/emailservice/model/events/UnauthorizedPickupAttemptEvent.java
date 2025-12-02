package com.creche.emailservice.model.events;

import lombok.Data;

@Data
public class UnauthorizedPickupAttemptEvent {
    private String nomeCrianca;
}
