package com.kh.app.adoption.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.app.adoption.vo.AdoptionVo;

@Repository
public class AdoptionDao {
	
	public int insert(SqlSessionTemplate sst, AdoptionVo vo) {
//		System.out.println("에러확인 dao : " + sst.selectList("AdoptionMapper.list"));
		return sst.insert("AdoptionMapper.insert", vo);
	}

	// 입양 게시글 작성
//	public int write(SqlSessionTemplate sst, AdoptionVo vo) {
//		System.out.println("에러확인 dao : " + sst.selectList("AdoptionMapper.list"));
//		return sst.insert("AdoptionMapper.write", vo);
//	}

	// 입양 게시글 목록
	public List<AdoptionVo> list(SqlSessionTemplate sst) {
		System.out.println("에러확인 dao : " + sst.selectList("AdoptionMapper.list"));
		return sst.selectList("AdoptionMapper.list");
	}

	// 입양 게시글 상세 조회
	public AdoptionVo detail(SqlSessionTemplate sst, AdoptionVo vo) {
		return sst.selectOne("AdoptionMapper.detail", vo);
	}

	// 입양 게시글 수정
	public int edit(SqlSessionTemplate sst, AdoptionVo vo) {
		return sst.update("AdoptionMapper.edit", vo);
	}

	// 입양 게시글 삭제
	public int delete(SqlSessionTemplate sst, AdoptionVo vo) {
		return sst.update("AdoptionMapper.delete", vo);
	}

	

}
