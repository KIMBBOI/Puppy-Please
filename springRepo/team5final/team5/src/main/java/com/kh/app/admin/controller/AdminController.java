package com.kh.app.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.app.admin.service.AdminService;
import com.kh.app.adoption.vo.ApplyVo;
import com.kh.app.page.vo.PageVo;
import com.kh.app.survey.vo.SurveyVo;
import com.kh.app.visit.vo.VisitVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("admin")
@RequiredArgsConstructor
public class AdminController {
	
	private final AdminService service;
	
	@GetMapping("adoptList")
	public Map<String, Object> adminAdoptList(){
		Map<String, Object> map = new HashMap<String, Object>();
		List<ApplyVo> adoptList = service.getAdoptList();
		List<SurveyVo> surveyList = service.getSurveyList();
		
		map.put("msg", "good");
		map.put("adoptList", adoptList);
		map.put("surveyList", surveyList);
		if(adoptList == null || surveyList == null) {
			map.put("msg", "bad");
		}
		return map;
		
	}
	
	@PostMapping("approveAdoption")
	public Map<String, String> approveAdoption(@RequestBody ApplyVo vo){
		Map<String, String> map = new HashMap<String,String>();
		int result = service.approveAdoption(vo);
		int result2 = service.insertApproveDate(vo);
		map.put("msg", "good");
		
		if(result != 1) {
			map.put("msg", "bad");
		}
		if(result2 != 1) {
			map.put("msg", "bad");
		}
		return map;
				
	}
	@PostMapping("rejectAdoption")
	public Map<String, String> rejectAdoption(@RequestBody ApplyVo vo){
		Map<String, String> map = new HashMap<String,String>();
		int result = service.rejectAdoption(vo);
		map.put("msg", "good");
		
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
		
	}
	
	
	// 방문예약 목록조회
	@GetMapping
	public Map<String, Object> reservationList(@RequestParam(value="pno", 
		    required = false, defaultValue="1")String pno) {
		
		// 전체 게시글 수 조회
		int listCount = service.selectVisitReservationCount();
		String currentPage_ = pno; // pno 받아와야함
		if(currentPage_ == null) {
			currentPage_ = "1";
		}
		int currentPage = Integer.parseInt(currentPage_);	// 현재 페이지 (화면에서 전달받기)
		int pageLimit = 5;									// 페이징 영역 페이지 갯수 (페이지를 몇개씩 띄울껀지)
		int boatdLimit = 8;									// 한 페이지에 보여줄 게시글 갯수
		PageVo pvo = new PageVo(listCount, currentPage, pageLimit, boatdLimit);
		
		
		// 목록조회
		List<VisitVo> voList = service.reservationList(pvo);
		Map<String, Object> map = new HashMap<>();
		if (currentPage_ == null || voList == null) {
			map.put("msg", "fail");
		} else {
			map.put("msg", "success");
			map.put("voList", voList);
			map.put("pvo", pvo);
		}
		return map;
	}
	
	// 방문예약 상세 조회
	@PostMapping
	public Map<String, Object> reservationDetail(@RequestBody VisitVo vo) {
		
		VisitVo dbVo = service.reservationDetail(vo);
		
		Map<String, Object> map = new HashMap<>();
		
		if (dbVo == null) {
			map.put("msg", "fail");
		} else {
			map.put("msg", "success");
			map.put("dbVo", dbVo);
		}
		return map;
	}

}
