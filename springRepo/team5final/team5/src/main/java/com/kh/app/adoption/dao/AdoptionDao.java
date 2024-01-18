package com.kh.app.adoption.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.app.adoption.vo.AdoptionVo;
import com.kh.app.adoptionnews.vo.AdoptionNewsVo;

@Repository
public class AdoptionDao {
	
	// 입양 게시글 목록
	public List<AdoptionVo> list(SqlSessionTemplate sst) {
		System.out.println("에러확인 dao : " + sst.selectList("AdoptionMapper.list"));
		return sst.selectList("AdoptionMapper.list");
	}
	
	// 전체 게시글 갯수 조회
	public int selectBoardCount(SqlSessionTemplate sst) {
		return sst.selectOne("AdoptionMapper.listCount");
	}

	// 입양 게시글 상세 조회
	public AdoptionVo detail(SqlSessionTemplate sst, AdoptionVo vo) {
		return sst.selectOne("AdoptionMapper.detail", vo);
	}

	// 이미지 업로드
	public int insertImg(SqlSessionTemplate sst, AdoptionVo imgVo) {
		return sst.insert("AdoptionMapper.insert", imgVo);
	}
	//이미지 시퀀스넘버 조회
	public String selectImageSeqNo(SqlSessionTemplate sst) {
		return sst.selectOne("AdoptionMapper.imageSeqNo");
	}
	
	//게시글 작성
	public int write(SqlSessionTemplate sst, AdoptionVo vo) {
		return sst.insert("AdoptionMapper.write", vo);
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
