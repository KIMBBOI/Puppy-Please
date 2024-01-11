package com.kh.app.law.dao;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.app.law.vo.LawVo;

@Service
public class LawDaoImpl implements LawDao {

	@Autowired
    private LawRepository lawRepository;

    @Override
    public List<Law> getAllLaws() {
        return lawRepository.findAll();
    }

    @Override
    public Law getLawById(Long id) {
        return lawRepository.findById(id).orElse(null);
    }

    @Override
    public List<Law> searchLaws(String keyword) {
        // 검색 로직 구현
        return null;
    }

    @Override
    public void addLaw(Law law) {
        lawRepository.save(law);
    }

    @Override
    public void updateLaw(Law law) {
        lawRepository.save(law);
    }

    @Override
    public void deleteLaw(Long id) {
        lawRepository.deleteById(id);
    }

}
