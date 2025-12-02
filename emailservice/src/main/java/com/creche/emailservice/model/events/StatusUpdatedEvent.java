package com.creche.emailservice.model.events;

import lombok.Data;

@Data
public class StatusUpdatedEvent {
    private String descricao;
}