package com.creche.emailservice.model.events;

import lombok.Data;

@Data
public class ChildCheckedOutEvent {
    private String nomeCrianca;
    private String retiradoPor;
    private String hora;
}

