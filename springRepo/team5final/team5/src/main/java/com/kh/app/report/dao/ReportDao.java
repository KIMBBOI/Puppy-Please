package com.kh.app.report.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.app.page.vo.PageVo;
import com.kh.app.report.vo.ReportVo;

@Repository
public class ReportDao {

	
	// 게시글 목록 조회
	public List<ReportVo> list(SqlSessionTemplate sst, PageVo pvo) {
		return sst.selectList("ReportMapper.list", pvo);
	}
	// 전게 게시글 갯수 조회
	public int selectBoardCount(SqlSessionTemplate sst) {
		return sst.selectOne("ReportMapper.listCount");
	}

	

	// 게시글 상세 조회
	public ReportVo detail(SqlSessionTemplate sst, ReportVo vo) {
		return sst.selectOne("ReportMapper.detail", vo);
	} 
	
	
	
	// 게시글 작성
	public int write(SqlSessionTemplate sst, ReportVo vo) {
		return sst.insert("ReportMapper.write", vo);
	}
	// 이미지 업로드
	public int insertImg(SqlSessionTemplate sst, ReportVo imgVo) {
		return sst.insert("ReportMapper.insert", imgVo);
	}
	// 이미지 시퀀스넘버 조회
	public String selectImageSeqNo(SqlSessionTemplate sst) {
		return sst.selectOne("ReportMapper.imageSeqNo");
	}	
	// 게시글 수정
	public int editBoard(SqlSessionTemplate sst, ReportVo vo) {
		return sst.update("ReportMapper.editBoard", vo);
	}
	// 이미지 수정
	public int editImage(SqlSessionTemplate sst, ReportVo imgVo) {
		return sst.update("ReportMapper.editImage", imgVo);
	}
	
	
	
	// 게시글 삭제
	public int delete(SqlSessionTemplate sst, ReportVo vo) {
		return sst.delete("ReportMapper.delete", vo);
	}

	
} // class
