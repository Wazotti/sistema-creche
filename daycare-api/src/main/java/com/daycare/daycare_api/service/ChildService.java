package com.daycare.daycare_api.service;

import com.daycare.daycare_api.model.Child;
import com.daycare.daycare_api.repository.ChildRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChildService {
    private final ChildRepository repo;

    public ChildService(ChildRepository repo) {
        this.repo = repo;
    }

    public List<Child> listar() { return repo.findAll(); }

    public Child criar(Child c) { return repo.save(c); }

    public Child atualizar(Long id, Child c) {
        Child existente = repo.findById(id).orElseThrow();
        existente.setNome(c.getNome());
        existente.setTurma(c.getTurma());
        existente.setStatus(c.getStatus());
        return repo.save(existente);
    }

    public void deletar(Long id) { repo.deleteById(id); }
}
