package com.daycare.daycare_api.service;

import com.daycare.daycare_api.model.Teacher;
import com.daycare.daycare_api.repository.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {
    private final TeacherRepository repo;

    public TeacherService(TeacherRepository repo) {
        this.repo = repo;
    }

    public List<Teacher> listar() {
        return repo.findAll();
    }

    public Teacher criar(Teacher t) {
        return repo.save(t);
    }

    public Teacher atualizar(Long id, Teacher t) {
        Teacher existente = repo.findById(id).orElseThrow();
        existente.setNome(t.getNome());
        existente.setTurma(t.getTurma());
        return repo.save(existente);
    }

    public void deletar(Long id) {
        repo.deleteById(id);
    }
}
