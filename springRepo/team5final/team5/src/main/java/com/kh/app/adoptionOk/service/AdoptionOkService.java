package com.kh.app.adoptionOk.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.app.adoptionOk.dao.AdoptionOkDao;
import com.kh.app.adoptionOk.vo.AdoptionOkVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdoptionOkService {
	
	private final AdoptionOkDao dao;
	private final SqlSessionTemplate sst;
	
	
	// 게시글 목록 조회
	public List<AdoptionOkVo> list() {
		return dao.list(sst); 
	}

	// 게시글 상세 조회
	public AdoptionOkVo detail(AdoptionOkVo vo) {
		return dao.detail(sst, vo);
	}
	
	// 게시글 작성
	public int insert(AdoptionOkVo vo) {
		return dao.insert(sst, vo);
	}
	
	// 게시글 수정
	public int edit(AdoptionOkVo vo) {
		return dao.edit(sst, vo);
	}
	
	// 게시글 삭제
	public int delete(AdoptionOkVo vo) {
		return dao.delete(sst, vo);
	}

}
