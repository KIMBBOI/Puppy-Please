package com.kh.app.adoption.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kh.app.adoption.service.AdoptionApplyService;
import com.kh.app.adoption.vo.ApplyVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("board/adoption/apply")
@ResponseBody
public class AdoptionApplyController {
	
	private final AdoptionApplyService service;
	
	@PostMapping
	public Map<String, String> apply(@RequestBody ApplyVo vo){
		Map<String, String> map = new HashMap<String, String>();
		
		
	}
	
	
}
