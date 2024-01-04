package com.kh.app.member.dao;

import org.mybatis.spring.SqlSessionTemplate;

import com.kh.app.member.vo.MemberVo;

public class MemberDao {

	public int join(SqlSessionTemplate sst, MemberVo vo) {
		return sst.insert("MemberMapper.join", vo);
	}

}
