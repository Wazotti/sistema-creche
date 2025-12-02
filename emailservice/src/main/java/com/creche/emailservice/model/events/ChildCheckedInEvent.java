package com.creche.emailservice.model.events;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChildCheckedInEvent {
    private String nomeCrianca;
    private String hora;
}
