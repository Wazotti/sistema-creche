package com.daycare.daycare_api.controller;

import com.daycare.daycare_api.model.Teacher;
import com.daycare.daycare_api.service.TeacherService;
import com.daycare.daycare_api.messaging.EventPublisher;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {
    private final TeacherService service;
    private final EventPublisher events;

    public TeacherController(TeacherService service, EventPublisher events) {
        this.service = service;
        this.events = events;
    }

    @GetMapping
    public List<Teacher> listar() {
        return service.listar();
    }

    @PostMapping
    public Teacher criar(@RequestBody Teacher t) {
        Teacher criado = service.criar(t);
        events.publishTeacherCreated(criado);
        return criado;
    }

    @PutMapping("/{id}")
    public Teacher atualizar(@PathVariable Long id, @RequestBody Teacher t) {
        Teacher atualizado = service.atualizar(id, t);
        events.publishTeacherUpdated(atualizado);
        return atualizado;
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
        events.publishTeacherDeleted(id);
    }
}
