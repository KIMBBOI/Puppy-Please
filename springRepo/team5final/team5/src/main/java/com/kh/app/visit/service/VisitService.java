package com.kh.app.visit.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.app.visit.dao.VisitDao;
import com.kh.app.visit.vo.VisitVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VisitService {
	
	private final VisitDao dao;
	private final SqlSessionTemplate sst;
	
	// 특정일 예약 목록 조회
	public List<VisitVo> list(String reservationDate) {
		return dao.list(sst, reservationDate); 
	}
	
	// 방문예약 중복 확인
	public VisitVo check(String memberNo) {
		return dao.check(sst, memberNo);
	}

	// 예약 상세 조회
	public VisitVo detail(String memberNo) {
		return dao.detail(sst, memberNo);
	}
	
	// 방문 예약하기
	public int insert(VisitVo vo) {
		return dao.insert(sst, vo);
	}
	
	// 예약 변경
	public int edit(VisitVo vo) {
		return dao.edit(sst, vo);
	}
	
	// 예약 취소->삭제
	public int quit(VisitVo vo) {
		return dao.quit(sst, vo);
	}
	
	// 상담 완료->삭제
	public int complete(VisitVo vo) {
		return dao.complete(sst, vo);
	}

	
} // class
