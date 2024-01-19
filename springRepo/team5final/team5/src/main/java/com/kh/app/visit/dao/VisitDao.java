package com.kh.app.visit.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.app.visit.vo.VisitVo;

@Repository
public class VisitDao {

	
	// 예약 목록 조회
	public List<VisitVo> list(SqlSessionTemplate sst, VisitVo vo) {
		return sst.selectList("VisitMapper.list");
	}

	// 예약 상세 조회
	public VisitVo detail(SqlSessionTemplate sst, VisitVo vo) {
		return sst.selectOne("VisitMapper.detail", vo);
	} 
	
	// 예약 작성
	public int insert(SqlSessionTemplate sst, VisitVo vo) {
		return sst.insert("VisitMapper.insert", vo);
	}
		// 로그인 멤버의 프라이머리 키
		// 이미지의 프라이머리 키
	
	// 예약 수정
	public int edit(SqlSessionTemplate sst, VisitVo vo) {
		return sst.update("VisitMapper.edit", vo);
	}
	
	// 예약 취소->삭제
	public int quit(SqlSessionTemplate sst, VisitVo vo) {
		return sst.delete("VisitMapper.quit", vo);
	}
	
	// 상담 완로->삭제
	public int complete(SqlSessionTemplate sst, VisitVo vo) {
		return sst.delete("VisitMapper.complete", vo);
	}
	
	
} // class
