package com.kh.app.report.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.app.page.vo.PageVo;
import com.kh.app.report.dao.ReportDao;
import com.kh.app.report.vo.ReportVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportService {

	private final ReportDao dao;
	private final SqlSessionTemplate sst;
	
	
	
	// 게시글 목록 조회
	public List<ReportVo> list(PageVo pvo) {
		return dao.list(sst, pvo); 
	}
	// 전게 게시글 갯수 조회
	public int selectBoardCount() {
		return dao.selectBoardCount(sst);
	}

	
	// 게시글 상세 조회
	public ReportVo detail(ReportVo vo) {
		return dao.detail(sst, vo);
	}
	
	
	// 게시글 작성
	public int insert(ReportVo vo) {
		return dao.insert(sst, vo);
	}
	
	
	// 게시글 수정
	public int edit(ReportVo vo) {
		return dao.edit(sst, vo);
	}
	
	
	// 게시글 삭제
	public int delete(ReportVo vo) {
		return dao.delete(sst, vo);
	}

	

} // class
