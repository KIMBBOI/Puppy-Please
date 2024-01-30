package com.kh.app.adoptionOk.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.app.adoption.vo.AdoptionVo;
import com.kh.app.page.vo.PageVo;

@Repository
public class AdoptionOkDao {
	
	// 게시글 목록 조회
	public List<AdoptionVo> list(SqlSessionTemplate sst, PageVo pvo) {
		System.out.println("에러확인 dao : " + sst.selectList("AdoptionOkMapper.list"));
		return sst.selectList("AdoptionOkMapper.list", pvo);
	}
	
	// 전체 게시글 갯수 조회
	public int selectBoardCount(SqlSessionTemplate sst) {
		return sst.selectOne("AdoptionOkMapper.listCount");
	}
	

	public int updateAdoptionStatus(SqlSessionTemplate sst, AdoptionVo vo) {
		return sst.update("AdoptionOkMapper.adoptionOk" , vo);
	}
	
	// 상세조회
	public AdoptionVo detail(SqlSessionTemplate sst, AdoptionVo vo) {
		return sst.selectOne("AdoptionOkMapper.detail", vo);
	}
	
	// 입양완료 처리
	public int complete(SqlSessionTemplate sst, String adoptionBoardNo) {
		return sst.update("AdoptionOkMapper.complete", adoptionBoardNo);
	}



}
