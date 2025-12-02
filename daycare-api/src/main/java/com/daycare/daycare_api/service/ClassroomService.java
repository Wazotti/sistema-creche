package com.daycare.daycare_api.service;

import com.daycare.daycare_api.model.Classroom;
import com.daycare.daycare_api.repository.ClassroomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassroomService {
    private final ClassroomRepository repo;

    public ClassroomService(ClassroomRepository repo) {
        this.repo = repo;
    }

    public List<Classroom> listar() {
        return repo.findAll();
    }

    public Classroom criar(Classroom c) {
        return repo.save(c);
    }

    public Classroom atualizar(Long id, Classroom c) {
        Classroom existente = repo.findById(id).orElseThrow();
        existente.setNome(c.getNome());
        existente.setCapacidade(c.getCapacidade());
        return repo.save(existente);
    }

    public void deletar(Long id) {
        repo.deleteById(id);
    }
}
