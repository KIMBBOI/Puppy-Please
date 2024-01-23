package com.kh.app.survey.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.app.survey.vo.SurveyVo;

@Repository
public class SurveyDao {

	public int insert(SqlSessionTemplate sst, SurveyVo vo) {
		return sst.insert("SurveyMapper.insert", vo);
	}

	public int updateSurveyResult(SqlSessionTemplate sst, SurveyVo vo) {
		return sst.update("SurveyMapper.updateResult", vo);
		
	}
	
	
	
}
