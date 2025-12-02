package com.daycare.daycare_api.controller;

import com.daycare.daycare_api.model.Guardian;
import com.daycare.daycare_api.service.GuardianService;
import com.daycare.daycare_api.messaging.EventPublisher;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guardians")
public class GuardianController {
    private final GuardianService service;
    private final EventPublisher events;

    public GuardianController(GuardianService service, EventPublisher events) {
        this.service = service;
        this.events = events;
    }

    @GetMapping
    public List<Guardian> listar() {
        return service.listar();
    }

    @PostMapping
    public Guardian criar(@RequestBody Guardian g) {
        Guardian criado = service.criar(g);
        events.publishGuardianCreated(criado);
        return criado;
    }

    @PutMapping("/{id}")
    public Guardian atualizar(@PathVariable Long id, @RequestBody Guardian g) {
        Guardian atualizado = service.atualizar(id, g);
        events.publishGuardianUpdated(atualizado);
        return atualizado;
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
        events.publishGuardianDeleted(id);
    }
}
