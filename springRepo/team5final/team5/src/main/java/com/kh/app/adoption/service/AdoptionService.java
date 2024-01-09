package com.kh.app.adoption.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.app.adoption.dao.AdoptionDao;
import com.kh.app.adoption.vo.AdoptionVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdoptionService {
	
	private final AdoptionDao dao;
	private final SqlSessionTemplate sst;

	// 입양 게시글 작성
	public int insert(AdoptionVo vo) {
		return dao.insert(sst, vo);
	}

}
