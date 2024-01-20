package com.kh.app.survey.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.app.survey.dao.SurveyDao;
import com.kh.app.survey.vo.SurveyVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SurveyService {

	private final SurveyDao dao;
	private final SqlSessionTemplate sst;
	public int insert(SurveyVo vo) {
		return dao.insert(sst, vo);
	}
	
}
