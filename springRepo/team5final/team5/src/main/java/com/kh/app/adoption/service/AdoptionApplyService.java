package com.kh.app.adoption.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.app.adoption.dao.AdoptionApplyDao;
import com.kh.app.adoption.vo.ApplyVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class AdoptionApplyService {
	
	private final AdoptionApplyDao dao;
	private final SqlSessionTemplate sst;
	public int insertApply(ApplyVo vo) {
		return dao.insertApply(sst,vo);
	}
}
