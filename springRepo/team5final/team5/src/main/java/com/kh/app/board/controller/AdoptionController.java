package com.kh.app.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kh.app.adoption.service.AdoptionService;
import com.kh.app.adoption.vo.AdoptionVo;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("adoption")
@RequiredArgsConstructor
public class AdoptionController {
	
	private final AdoptionService service;
	
	// 입양 게시글 작성
	@PostMapping("insert")
	public String insert(AdoptionVo vo) throws Exception {
		
		int result = service.insert(vo);
		
		if(result != 1) {
			throw new Exception();
		} 
		
		return "redirect:/adoption/list";
	}

}
