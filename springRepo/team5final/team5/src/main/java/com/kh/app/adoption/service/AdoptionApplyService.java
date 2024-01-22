package com.kh.app.adoption.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.app.adoption.dao.AdoptionApplyDao;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class AdoptionApplyService {
	
	private final AdoptionApplyDao dao;
	private final SqlSessionTemplate sst;
}
