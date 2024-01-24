package com.kh.app.adoptionOk.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.app.adoption.vo.AdoptionVo;
import com.kh.app.adoptionOk.dao.AdoptionOkDao;
import com.kh.app.page.vo.PageVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdoptionOkService {
	
	private final AdoptionOkDao dao;
	private final SqlSessionTemplate sst;
	
	
	// 게시글 목록 조회
	public List<AdoptionVo> list(PageVo pvo) {
		return dao.list(sst); 
	}


	public int selectBoardCount() {
		return dao.selectBoardCount(sst);
	}

	// 입양완료 처리
	public int complete(String adoptionBoardNo) {
		return dao.complete(sst, adoptionBoardNo);
	}

	// 상세조회
	public AdoptionVo detail(AdoptionVo vo) {
		return dao.detail(sst, vo);
	}


}
