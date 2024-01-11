package com.kh.app.law.dao;

import java.util.List;

import com.kh.app.law.vo.LawVo;

public interface LawDao {
	
	List<LawVo> getAllLaws();
	
    LawVo getLawById(Long id);
    
    List<LawVo> searchLaws(String keyword);
    
    void addLaw(LawVo law);
    
    void updateLaw(LawVo law);
    
    void deleteLaw(Long id);

}
