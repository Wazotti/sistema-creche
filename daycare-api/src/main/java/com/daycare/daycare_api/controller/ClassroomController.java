package com.daycare.daycare_api.controller;

import com.daycare.daycare_api.model.Classroom;
import com.daycare.daycare_api.service.ClassroomService;
import com.daycare.daycare_api.messaging.EventPublisher;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classrooms")
public class ClassroomController {
    private final ClassroomService service;
    private final EventPublisher events;

    public ClassroomController(ClassroomService service, EventPublisher events) {
        this.service = service;
        this.events = events;
    }

    @GetMapping
    public List<Classroom> listar() {
        return service.listar();
    }

    @PostMapping
    public Classroom criar(@RequestBody Classroom c) {
        Classroom criado = service.criar(c);
        events.publishClassroomCreated(criado);
        return criado;
    }

    @PutMapping("/{id}")
    public Classroom atualizar(@PathVariable Long id, @RequestBody Classroom c) {
        Classroom atualizado = service.atualizar(id, c);
        events.publishClassroomUpdated(atualizado);
        return atualizado;
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
        events.publishClassroomDeleted(id);
    }
}
