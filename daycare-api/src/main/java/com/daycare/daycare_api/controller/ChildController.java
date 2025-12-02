package com.daycare.daycare_api.controller;

import com.daycare.daycare_api.model.Child;
import com.daycare.daycare_api.service.ChildService;
import com.daycare.daycare_api.messaging.EventPublisher;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/criancas")
public class ChildController {
    private final ChildService service;
    private final EventPublisher events;

    public ChildController(ChildService service, EventPublisher events) {
        this.service = service;
        this.events = events;
    }

    @GetMapping
    public List<Child> listar() {
        return service.listar();
    }

    @PostMapping
    public Child criar(@RequestBody Child c) {
        Child criado = service.criar(c);
        events.publishChildCreated(criado);
        return criado;
    }

    @PutMapping("/{id}")
    public Child atualizar(@PathVariable Long id, @RequestBody Child c) {
        Child atualizado = service.atualizar(id, c);
        events.publishChildUpdated(atualizado);
        return atualizado;
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
        events.publishChildDeleted(id);
    }
}