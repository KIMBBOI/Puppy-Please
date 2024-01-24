package com.kh.app.member.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kh.app.adoption.vo.ApplyVo;
import com.kh.app.member.service.MemberService;
import com.kh.app.member.vo.MemberVo;
import com.kh.app.survey.vo.SurveyVo;

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
	    MemberVo updatedVo = service.updateProfile(vo);
	    // 세션 정보 업데이트
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
	
	
	// 입양신청목록
	@GetMapping("memberAdoptList")
	public Map<String, Object> adoptList(@ModelAttribute MemberVo vo){
		System.out.println(vo);
		
		List<ApplyVo> adoptList = service.getAdoptList(vo);
		List<SurveyVo> surveyList = service.getSurveyList(vo);
		System.out.println(adoptList);
		System.out.println("surveyVo : " + surveyList);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("msg", "good");
		map.put("adoptList", adoptList);
		map.put("surveyList", surveyList);
		if(adoptList == null) {
			map.put("msg", "bad");
		}
		return map;
		
		
		
	}
	
	@PostMapping("editSurvey")
	public Map<String, String> editSurvey(@RequestBody SurveyVo vo){
		Map<String, String> map = new HashMap<String, String>();
		System.out.println("survey edit :" + vo);
		int result = service.editSurvey(vo);
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	@PostMapping("editApply")
	public Map<String, String> editApply(@RequestBody ApplyVo vo){
		Map<String, String> map = new HashMap<String, String>();
		System.out.println("apply edit :" + vo);
		int result = service.editApply(vo);
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
}
