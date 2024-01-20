package com.kh.app.survey.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kh.app.survey.service.SurveyService;
import com.kh.app.survey.vo.SurveyVo;

import lombok.RequiredArgsConstructor;

@RestController
@ResponseBody
@RequestMapping("board/adoption/survey")
@RequiredArgsConstructor
public class SurveyController {
	
	private final SurveyService service;
	
	@PostMapping
	public Map<String, String> surveyInsert(@RequestBody SurveyVo vo){
		Map<String, String> map = new HashMap<String, String>();
		System.out.println("survey fetch처음 들어올 때의 vo : " + vo);
		int result = service.insert(vo);
		
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
}
