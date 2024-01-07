package com.kh.app.member.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kh.app.member.service.MemberService;
import com.kh.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;

@Controller
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
		
		Map<String, String> map = new HashMap<String, String>();
		if(result == 1) {
			map.put("msg", "good");
		}else {
			map.put("msg", "fail");
		}
		return map;
	}
	
	//로그인
	@PostMapping("login")
	public String login(MemberVo vo, HttpSession session)throws Exception {
		MemberVo loginMember = service.login(vo);
		
		if(loginMember == null) {
			throw new Exception("로그인 실패");
		}
		session.setAttribute("loginMember", loginMember);
		session.setAttribute("alertMsg", "로그인 성공!");
		return "redirect:/home";
	}
	
	//로그아웃
	@GetMapping("logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/home";
	}
	
	@PostMapping("edit")
	public String edit(MemberVo vo) throws Exception{
		int result = service.edit(vo);
		if(result != 1) {
			throw new Exception("회원정보 수정 실패");
		}
		return "";
	}
	
	@GetMapping("quit")
	public String quit(MemberVo vo, HttpSession session) throws Exception{
		int result = service.quit(vo);
		
		if(result != 1) {
			throw new Exception("회원탈퇴 실패");
		}
		session.removeAttribute("loginMember");
		session.setAttribute("alertMsg", "회원탈퇴 완료");
		
		return "redirect:/home";
	}
	
}
