package com.kh.app.member.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kh.app.member.service.MemberService;
import com.kh.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;

@RestController
@ResponseBody
@RequestMapping("member")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MemberController {
	
	private final MemberService service;
	//회원가입
	@GetMapping("join")
	public String join() {
		return "member/join";
	}
	//회원가입 후
	@PostMapping("join")
	public Map<String, String> join(@RequestBody MemberVo vo) throws Exception{
		int result = service.join(vo);
		
		Map<String, String> map = new HashMap<>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "fail");
		}
		return map;
	}
	
	//로그인
	@PostMapping("login")
	public Map<String, Object> login(@RequestBody MemberVo vo)throws Exception {
		MemberVo loginMemberVo = service.login(vo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("msg", "login success");
		map.put("loginMemberVo", loginMemberVo);
		if(loginMemberVo == null) {
			throw new Exception("로그인 실패");
		}
		
		return map;
	}
	
	//로그아웃
	@GetMapping("logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/home";
	}
	
	//회원 탈퇴
	@DeleteMapping
	public String quit(MemberVo vo, HttpSession session) throws Exception{
		int result = service.quit(vo);
		
		if(result != 1) {
			throw new Exception("회원탈퇴 실패");
		}
		session.removeAttribute("loginMember");
		session.setAttribute("alertMsg", "회원탈퇴 완료");
		
		return "redirect:/home";
	}
	//아이디 찾기
	@PostMapping("searchId")
	public Map<String, Object> searchId(@RequestBody MemberVo vo) throws Exception{
		Map<String, Object> map = new HashMap<>();
		MemberVo resultVo = service.searchId(vo);
		if(resultVo != null) {
			map.put("msg", resultVo.getId());
		}else {
			map.put("msg", null);
		}
		return map;
	}
	
}
