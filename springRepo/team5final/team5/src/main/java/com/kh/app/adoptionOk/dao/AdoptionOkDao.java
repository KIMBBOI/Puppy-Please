package com.kh.app.adoptionOk.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.app.adoptionOk.vo.AdoptionOkVo;

@Repository
public class AdoptionOkDao {
	
	// 게시글 목록 조회
	public List<AdoptionOkVo> list(SqlSessionTemplate sst) {
		System.out.println("에러확인 dao : " + sst.selectList("AdoptionOkMapper.list"));
		return sst.selectList("AdoptionOkMapper.list");
	}

	// 게시글 상세 조회
	public AdoptionOkVo detail(SqlSessionTemplate sst, AdoptionOkVo vo) {
		return sst.selectOne("AdoptionOkMapper.detail", vo);
	} 
	
	// 게시글 작성
	public int insert(SqlSessionTemplate sst, AdoptionOkVo vo) {
		return sst.insert("AdoptionOkMapper.insert", vo);
	}
		// 로그인 멤버의 프라이머리 키
		// 이미지의 프라이머리 키
	
	// 게시글 수정
	public int edit(SqlSessionTemplate sst, AdoptionOkVo vo) {
		return sst.update("AdoptionOkMapper.edit", vo);
	}
	
	// 게시글 삭제
	public int delete(SqlSessionTemplate sst, AdoptionOkVo vo) {
		return sst.delete("AdoptionOkMapper.delete", vo);
		}

}