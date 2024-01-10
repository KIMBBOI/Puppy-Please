package com.kh.app.member.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.app.member.vo.MemberVo;

@Repository
public class MemberDao {
	
	//회원가입
	public int join(SqlSessionTemplate sst, MemberVo vo) {
		return sst.insert("MemberMapper.join", vo);
	}
	//로그인
	public MemberVo login(SqlSessionTemplate sst, MemberVo vo) {
		return sst.selectOne("MemberMapper.login", vo);
	}
	//회원 탈퇴
	public int quit(SqlSessionTemplate sst, MemberVo vo) {
		return sst.update("MemberMapper.quit", vo);
	}
	//회원 정보 수정
	public int edit(SqlSessionTemplate sst, MemberVo vo) {
		return sst.update("MemberMapper.edit", vo);
	}
	
	//아이디 찾기
	public MemberVo searchId(SqlSessionTemplate sst, MemberVo vo) {
		return sst.selectOne("MemberMapper.searchId", vo);
	}

}
