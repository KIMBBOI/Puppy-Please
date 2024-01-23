package com.kh.app.visit.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.app.visit.vo.VisitVo;
import com.kh.app.visit.service.VisitService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("visit")
@RequiredArgsConstructor
public class VisitController {

	private final VisitService service;
	
	// 방문예약 중복 확인
	@GetMapping
	public Map<String, Object> check(@RequestParam(value="memberNo", 
		    required = false, defaultValue="1") String memberNo) {
		
		Map<String, Object> map = new HashMap<>();
		VisitVo dbVo = service.detail(memberNo);
		
		if (dbVo != null) {
			map.put("msg", "success");
			map.put("dbVo", dbVo);
		} else {
			map.put("msg", "fail");
		}
		
		return map;
	}
	
	
	// 방문예약하기
	@PostMapping
	public Map<String, String> write(@RequestBody VisitVo vo) {
		System.out.println(vo);
			
		Map<String, String> map = new HashMap<String, String>();
		int result = service.insert(vo);
		
		if (result == 1) {
			map.put("msg", "success");
		} else {
			map.put("msg", "fail");
		}
		
		return map;
	}
	
	
	
	// 특정일 예약 목록 조회
	@GetMapping("list")
	public Map<String, Object> list(@RequestParam("reservationDate") String reservationDate) {
		
		Map<String, Object> map = new HashMap<>();
		List<VisitVo> voList = service.list(reservationDate);
        
		if (voList != null) {
			// voList에서 객체의 reservationDate 값들을 추출하여 문자 배열로 만들기
			String[] reservationDateArr = voList.stream()
					.map(VisitVo::getReservationDate)
					.toArray(String[]::new);
			
			map.put("msg", "success");
			map.put("reservationDateArr", reservationDateArr);
		} else {
			map.put("msg", "fail");
		}
		return map;
	}
	
	
	// 예약 상세 조회
	@GetMapping("detail")
	public Map<String, Object> detail(@RequestParam(value="memberNo", 
		    required = false, defaultValue="1") String memberNo) {
		
		Map<String, Object> map = new HashMap<>();
		VisitVo dbVo = service.detail(memberNo);
		
		if (dbVo != null) {
			map.put("msg", "success");
			map.put("dbVo", dbVo);
		} else {
			map.put("msg", "fail");
		}
		
		return map;
	}
		
	
	// 예약 수정
	@PutMapping("edit")
	public Map<String, String> edit(@RequestBody VisitVo vo) {
		
		Map<String, String> map = new HashMap<String, String>();
		int result = service.edit(vo);
		
		if (result == 1) {
			map.put("msg", "success");
		} else {
			map.put("msg", "fail");
		}
		
		return map;
	}
	
	
	// 예약 취소->삭제
	@DeleteMapping("quit")
	public Map<String, String> quit(@RequestBody VisitVo vo) {
		
		Map<String, String> map = new HashMap<String, String>();
		int result = service.quit(vo);
		
		if (result == 1) {
			map.put("msg", "success");
		} else {
			map.put("msg", "fail");
		}
		
		return map;
	}
	
	// 상담 완료->삭제
	@DeleteMapping
	public Map<String, String> complete(@RequestBody VisitVo vo) {
		
		Map<String, String> map = new HashMap<String, String>();
		int result = service.complete(vo);
		
		if (result == 1) {
			map.put("msg", "success");
		} else {
			map.put("msg", "fail");
		}
		
		return map;
	}
	
	
} // class
