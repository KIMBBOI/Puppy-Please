package com.kh.app.member.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kh.app.member.service.MemberService;
import com.kh.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;

@Controller
@ResponseBody
@RequestMapping("member/mypage")
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
		
	//세션정보 업데이트
	@RequestMapping("updateProfile")
	public Map<String, Object> updateProfile(@RequestBody MemberVo vo, HttpSession session) {
	    // 사용자 정보 업데이트 로직
		System.out.println("세션정보 업데이트전 vo : "+vo);
	    MemberVo updatedVo = service.updateProfile(vo);
	    // 세션 정보 업데이트
	    System.out.println("세션정보 업데이트 후 vo : " + updatedVo);
	    Map<String, Object> map = new HashMap<String, Object>();
	    map.put("msg", "update success");
	    map.put("loginMemberVo", updatedVo);
	    if(updatedVo == null) {
	    	map.put("msg", "fail");
	    }
	    session.setAttribute("loginMemberVo", updatedVo);
	    
	    return map;
	}
	//회원 탈퇴
	@DeleteMapping("memberQuit")
	public Map<String, String> quit(@RequestBody MemberVo vo) throws Exception{
		int result = service.delete(vo);
		Map<String, String> map = new HashMap<String, String>();
		
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	
//	// 입양신청내역
//	@GetMapping
//	public Map<String, Object> adoptList(@RequestBody MemberVo vo){
//		
//	}
//	
	
}
