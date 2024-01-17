package com.kh.app.member.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kh.app.member.service.MemberMailService;
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
	private final MemberMailService mailService;	
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
	//이메일 보내기
	@PostMapping("join/mailSend")
	public Map<String, String> mailSend(@RequestBody MemberVo vo){
		
		Map<String, String> map = new HashMap<>();
		try {
			mailService.joinEmail(vo.getEmail());
			map.put("msg", "good");
		}catch(Exception e) {
			e.printStackTrace();
			map.put("msg", "fail");
			
		}
		
		return map;
	}
	//비밀번호 찾기 -> 비밀번호를 임시 비밀번호로 업데이트 한 뒤, 업데이트한 비밀번호를 메일로 보내주기 
		@PostMapping("searchPwd")
		public Map<String, Object> searchPwd(@RequestBody MemberVo vo) throws Exception{
			System.out.println(vo);
			Map<String, Object> map = new HashMap<String, Object>();
			int result = service.changeTempPwd(vo);
			if(result == 1) {
				mailService.searchPwdEmail(vo.getEmail());
				map.put("msg", "good");
			}else {
				map.put("msg", "fail");
			}
			return map;
		}
		
	//이메일 인증
	@PostMapping("join/mailCheck")
	public Map<String, String> mailCheck(@RequestBody MemberVo vo){
		System.out.println(vo.getEmailCheck());
		Map<String, String> map = new HashMap<>();
			int result = mailService.checkEmail(vo.getEmailCheck());
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
	
//	//회원 탈퇴
//	@DeleteMapping
//	public String quit(MemberVo vo, HttpSession session) throws Exception{
//		int result = service.quit(vo);
//		
//		if(result != 1) {
//			throw new Exception("회원탈퇴 실패");
//		}
//		session.removeAttribute("loginMember");
//		session.setAttribute("alertMsg", "회원탈퇴 완료");
//		
//		return "redirect:/home";
//	}
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
