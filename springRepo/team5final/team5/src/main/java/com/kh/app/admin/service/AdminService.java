package com.kh.app.admin.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.app.admin.dao.AdminDao;
import com.kh.app.admin.vo.AdminVo;
import com.kh.app.adoption.vo.ApplyVo;
import com.kh.app.page.vo.PageVo;
import com.kh.app.survey.vo.SurveyVo;
import com.kh.app.visit.vo.VisitVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
	private final AdminDao dao;
	private final SqlSessionTemplate sst;
	
	
	public AdminVo login(AdminVo vo) {
		return dao.login(sst, vo);
	}


	public List<ApplyVo> getAdoptList() {
		return dao.getAdoptList(sst);
	}


	public List<SurveyVo> getSurveyList() {
		return dao.getSurveyList(sst);
	}


	public int approveAdoption(ApplyVo vo) {
		return dao.approveAdoption(sst, vo);
	}


	public int insertApproveDate(ApplyVo vo) {
		return dao.insertApproveDate(sst,vo);
	}


	public int rejectAdoption(ApplyVo vo) {
		return dao.rejectAdoption(sst, vo);
	}
	
	// 방문예약 목록조회
	public List<VisitVo> reservationList(PageVo pvo) {
		return dao.reservationList(sst, pvo); 
	}
	// 전체 방문예약 수 조회
	public int selectVisitReservationCount() {
		return dao.selectVisitReservationCount(sst);
	}
	// 방문예약 상세 조회
	public VisitVo reservationDetail(VisitVo vo) {
		return dao.reservationDetail(sst, vo);
	}
	// 방문예약 상담취소
	public int adviceQuit(VisitVo vo) {
		return dao.adviceQuit(sst, vo);
	}
	// 방문예약 상담완료
	public int adviceComplete(VisitVo vo) {
		return dao.adviceComplete(sst, vo);
	}

}
