package com.daycare.daycare_api.service;

import com.daycare.daycare_api.model.Guardian;
import com.daycare.daycare_api.repository.GuardianRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuardianService {
    private final GuardianRepository repo;

    public GuardianService(GuardianRepository repo) {
        this.repo = repo;
    }

    public List<Guardian> listar() {
        return repo.findAll();
    }

    public Guardian criar(Guardian g) {
        return repo.save(g);
    }

    public Guardian atualizar(Long id, Guardian g) {
        Guardian existente = repo.findById(id).orElseThrow();
        existente.setNome(g.getNome());
        existente.setTelefone(g.getTelefone());
        existente.setAutorizado(g.getAutorizado());
        return repo.save(existente);
    }

    public void deletar(Long id) {
        repo.deleteById(id);
    }
}
