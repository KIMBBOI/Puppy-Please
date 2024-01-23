package com.kh.app.quiz.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.app.quiz.dao.QuizDao;
import com.kh.app.quiz.vo.QuizVo;

import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
public class QuizService {
	private final QuizDao dao;
	private final SqlSessionTemplate sst;

	public int quizCheck(QuizVo vo) {
		return dao.quizCheck(sst, vo);
	}

	public int memberQuizPass(QuizVo vo) {
		return dao.memberQuizPass(sst, vo);
	}

}
