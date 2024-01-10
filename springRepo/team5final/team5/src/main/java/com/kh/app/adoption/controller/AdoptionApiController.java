package com.kh.app.adoption.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.app.adoption.service.AdoptionService;
import com.kh.app.adoption.vo.AdoptionVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/adoption")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdoptionApiController {

	private final AdoptionService service;
	
	// 입양 게시글 작성
	@PostMapping("write")
	public Map<String, String> write(@RequestBody AdoptionVo vo) {
		Map<String, String> map = new HashMap<String, String>();
		int result = service.insert(vo);
		
		if(result == 1) {
			map.put("msg", "입양게시글 작성에 성공하였습니다.");
		} else {
			map.put("msg", "입양게시글 작성에 실패하였습니다.");
		}
		
		return map;
	}
	
}
