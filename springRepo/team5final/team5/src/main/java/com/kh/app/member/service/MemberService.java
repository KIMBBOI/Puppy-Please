package com.kh.app.member.service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.kh.app.member.dao.MemberDao;
import com.kh.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {

	private final MemberDao dao;
	private final SqlSessionTemplate sst;
	private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	private final MemberMailService mailService;
	
	//회원가입
	public int join(MemberVo vo) throws Exception{
		
		String id = vo.getId();
		String pwd = vo.getPwd();
		String nick = vo.getNick();
		String phoneNumber = vo.getPhoneNumber();
		String email = vo.getEmail();
		String emailCheck = vo.getEmailCheck();
		
		System.out.println(vo);
		
		// 아이디 검사

		// 아이디가 "admin"과 같은지 대소문자 구별 없이 검사
		if("admin".equalsIgnoreCase(id)) {
		    throw new Exception("admin은 사용 불가능한 아이디에요.");
		}

		// 아이디의 길이와 특수문자 포함 여부 검사
		Pattern idPattern = Pattern.compile("^[A-Za-z\\d]{6,12}$");
		Matcher idMatcher = idPattern.matcher(id);
		if(!idMatcher.find()) {
		    throw new Exception("아이디는 6자 이상 12자 이하이며, 특수문자를 포함할 수 없어요.");
		}
		
		//비밀번호 검사
		Pattern passPattern1 = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,16}$");
		Matcher passMatcher = passPattern1.matcher(pwd);
		if(!passMatcher.find()) {
			throw new Exception("비밀번호는 8~16자 및 대문자와 특수문자를 포함해야해요.");
		}
		String newPwd = encoder.encode(pwd);
		vo.setPwd(newPwd);
		
		//닉네임 검사
		// 닉네임에 "admin"이 포함되는지 대소문자 구별 없이 검사
		if(nick.toLowerCase().contains("admin")) {
		    throw new Exception("닉네임에 admin을 포함할 수 없어요.");
		}
		// 닉네임의 길이 검사
		if(nick.length() < 4 || nick.length() > 12) {
		    throw new Exception("닉네임은 4자 이상 12자 이하이어야 해요.");
		}
		// 핸드폰 번호 검사
		Pattern phonePattern = Pattern.compile("^01[016789]-\\d{3,4}-\\d{4}$");
		Matcher phoneMatcher = phonePattern.matcher(phoneNumber);
		if(!phoneMatcher.find()) {
		    throw new Exception("핸드폰 번호 형식이 올바르지 않습니다.");
		}
		
		// 이메일 검사
		Pattern emailPattern = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
		Matcher emailMatcher = emailPattern.matcher(email);
		if(!emailMatcher.find()) {
		    throw new Exception("이메일 주소 형식이 올바르지 않습니다.");
		}
		if(mailService.checkEmail(emailCheck) != 1) {
			throw new Exception("이메일 인증코드 다름");
		}
		
		
		return dao.join(sst,vo);
	}
	
	//회원정보 수정
	public int edit(MemberVo vo) throws Exception{
		
		String pwd = vo.getPwd();
		String nick = vo.getNick();
		String phoneNumber = vo.getPhoneNumber();
		String email = vo.getEmail();
				
		if(pwd != null) {
			//비밀번호 검사
			Pattern passPattern1 = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,16}$");
			Matcher passMatcher = passPattern1.matcher(pwd);
			if(!passMatcher.find()) {
				throw new Exception("비밀번호는 8~16자 및 대문자와 특수문자를 포함해야해요.");
			}
			String newPwd = encoder.encode(vo.getPwd());
			vo.setPwd(newPwd);
			
			
		}
		if(nick != null) {
			//닉네임 검사
			// 닉네임에 "admin"이 포함되는지 대소문자 구별 없이 검사
			if(nick.toLowerCase().contains("admin")) {
				throw new Exception("닉네임에 admin을 포함할 수 없어요.");
			}
			
			// 닉네임의 길이 검사
			if(nick.length() < 4 || nick.length() > 12) {
				throw new Exception("닉네임은 4자 이상 12자 이하이어야 해요.");
			}
		}
		if(phoneNumber != null) {
			// 핸드폰 번호 검사
			Pattern phonePattern = Pattern.compile("^01[016789]-\\d{3,4}-\\d{4}$");
			Matcher phoneMatcher = phonePattern.matcher(phoneNumber);
			if(!phoneMatcher.find()) {
				throw new Exception("핸드폰 번호 형식이 올바르지 않습니다.");
			}
			
		}
		if(email != null) {
			// 이메일 검사
			Pattern emailPattern = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");
			Matcher emailMatcher = emailPattern.matcher(email);
			if(!emailMatcher.find()) {
				throw new Exception("이메일 주소 형식이 올바르지 않습니다.");
			}
			
		}
		return dao.edit(sst,vo);
	}
	//로그인
	public MemberVo login(MemberVo vo) {
		MemberVo dbVo = dao.login(sst, vo);
		System.out.println(dbVo+"\n"+vo);
		boolean isOk = encoder.matches(vo.getPwd(), dbVo.getPwd());
		System.out.println(isOk);
		if(!isOk) {
			return null;
		}
		return dbVo;
		
	}
	//회원탈퇴
	public int quit(MemberVo vo) {
		return dao.quit(sst,vo);
	}
	//아이디찾기
	public MemberVo searchId(MemberVo vo) {
		return dao.searchId(sst, vo);
	}

	public int delete(MemberVo vo) {
		MemberVo dbVo = dao.login(sst, vo);
		System.out.println("dbVo:"+dbVo+"\n vo:"+vo);
		boolean isOk = encoder.matches(vo.getPwd(), dbVo.getPwd());
		System.out.println(isOk);
		if(!isOk) {
			return 0;
		}else {
			System.out.println(dao.quit(sst, vo));
			return dao.quit(sst,vo);
		}
	}

	public MemberVo updateProfile(MemberVo vo) {
		return dao.updateProfile(sst, vo);
	}

	public int changeTempPwd(MemberVo vo) {
		return dao.changeTempPwd(sst, vo);
	}


}
