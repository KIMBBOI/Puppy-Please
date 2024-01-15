package com.kh.app.member.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kh.app.member.service.MemberService;
import com.kh.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;

@Controller
@ResponseBody
@RequestMapping("mypage")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MyPageController {
	private final MemberService service;
	
	//회원 정보 수정
	@PutMapping("memberInfoEdit")
	public Map<String, String> edit(@RequestBody MemberVo vo) throws Exception{
		System.out.println(vo.toString());
		int result = service.edit(vo);
		Map<String, String> map = new HashMap<String, String>();
		
		map.put("msg", "good");
		
		if(result != 1) {
			map.put("msg", "bad");
		}
		
		return map;
	}
		
}
