package com.kh.app.quiz.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.app.quiz.vo.QuizVo;
@Repository
public class QuizDao {

	public int quizCheck(SqlSessionTemplate sst, QuizVo vo) {
		return sst.insert("QuizMapper.insert", vo);
	}

}
