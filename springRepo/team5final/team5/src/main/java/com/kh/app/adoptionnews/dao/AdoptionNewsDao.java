package com.kh.app.adoptionnews.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.app.adoptionnews.vo.AdoptionNewsVo;
import com.kh.app.page.vo.PageVo;

@Repository
public class AdoptionNewsDao {
	
	// 이미지 업로드
	public int insertImg(SqlSessionTemplate sst, AdoptionNewsVo imgVo) {
		return sst.insert("AdoptionNewsMapper.insert", imgVo);
	}
	//이미지 시퀀스넘버 조회
	public String selectImageSeqNo(SqlSessionTemplate sst) {
		return sst.selectOne("AdoptionNewsMapper.imageSeqNo");
	}
	//게시글 작성
	public int write(SqlSessionTemplate sst, AdoptionNewsVo vo) {
		return sst.insert("AdoptionNewsMapper.write", vo);
	}

	// 입양 후 소식 목록
	public List<AdoptionNewsVo> list(SqlSessionTemplate sst, PageVo pvo) {
		System.out.println("에러확인 dao : " + sst.selectList("AdoptionNewsMapper.list"));
		return sst.selectList("AdoptionNewsMapper.list", pvo);
	}
	
	// 전체 게시글 갯수 조회
	public int selectBoardCount(SqlSessionTemplate sst) {
		return sst.selectOne("AdoptionNewsMapper.listCount");
	}

	// 입양 후 소식 상세 조회
	public AdoptionNewsVo detail(SqlSessionTemplate sst, AdoptionNewsVo vo) {
		return sst.selectOne("AdoptionNewsMapper.detail", vo);
	}

	// 입양 후 소식 이미지 수정
	public int editImage(SqlSessionTemplate sst, AdoptionNewsVo imgVo) {
		return sst.update("AdoptionNewsMapper.editImage" , imgVo);
	}
	
	//게시글 수정
	public int editBoard(SqlSessionTemplate sst, AdoptionNewsVo vo) {
		return sst.update("AdoptionNewsMapper.editBoard" , vo);
	}
	

	// 입양 후 소식 삭제
	public int delete(SqlSessionTemplate sst, AdoptionNewsVo vo) {
		return sst.update("AdoptionNewsMapper.delete", vo);
	}
	


	

	

	

}
