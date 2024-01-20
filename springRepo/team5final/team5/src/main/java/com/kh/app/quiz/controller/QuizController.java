package com.kh.app.quiz.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kh.app.quiz.service.QuizService;
import com.kh.app.quiz.vo.QuizVo;

import lombok.RequiredArgsConstructor;

@RestController
@ResponseBody
@RequiredArgsConstructor
@RequestMapping("board/adoption/quiz")
public class QuizController {
	
	private final QuizService service;
	
	
	@PostMapping
	public Map<String, String> quizCheck(@RequestBody QuizVo vo){
		Map<String, String> map = new HashMap<String, String>();
		int result = service.quizCheck(vo);
		
		map.put("msg", "pass");
		if(result != 1) {
			map.put("msg", "non pass");
		}
		return map;
	}
	
	
}
