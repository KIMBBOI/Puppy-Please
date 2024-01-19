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
import org.springframework.web.bind.annotation.RestController;

import com.kh.app.visit.vo.VisitVo;
import com.kh.app.visit.service.VisitService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("visit")
@RequiredArgsConstructor
public class VisitController {

	private final VisitService service;
	
	
	// 예약 작성
	@PostMapping
	public Map<String, String> write(@RequestBody VisitVo vo) {
		
		// 날짜형식 데이터 문자열 자르기
		System.out.println("vo : " + vo);
		System.out.println(vo.getReservationDate().substring(0, 10));
		vo.setReservationDate(vo.getReservationDate().substring(0, 10));
			
		Map<String, String> map = new HashMap<String, String>();
		int result = service.insert(vo);
		
		if (result == 1) {
			map.put("msg", "success");
				System.out.println("예약 성공 !");
		} else {
			map.put("msg", "fail");
				System.out.println("예약 실패 ...");
		}
		
		return map;
	}
	
	
	
	// 예약 목록 조회
	@GetMapping("list")
	public List<VisitVo> list(@RequestBody VisitVo vo) {
		System.out.println("예약 목록 조회 vo : " + vo);
		System.out.println(vo.getReservationDate().substring(0, 10));
		vo.setReservationDate(vo.getReservationDate().substring(0, 10));
		return service.list(vo);
	}
	
	
	// 예약 상세 조회
	@GetMapping
	public VisitVo detail(@RequestBody VisitVo vo) {
		return service.detail(vo);
	}
		
	
	// 예약 수정
	@PutMapping
	public Map<String, String> edit(@RequestBody VisitVo vo) {
		
		Map<String, String> map = new HashMap<String, String>();
		int result = service.edit(vo);
		
		if (result == 1) {
			map.put("msg", "success");
				System.out.println("예약 수정 성공 !");
		} else {
			map.put("msg", "fail");
				System.out.println("예약 수정 실패 ...");
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
				System.out.println("예약 취소 성공 !");
		} else {
			map.put("msg", "fail");
				System.out.println("예약 취소 실패 ...");
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
			System.out.println("상담 완료 글 삭제 성공 !");
		} else {
			map.put("msg", "fail");
			System.out.println("상담 완료 글 삭제 실패 ...");
		}
		
		return map;
	}
	
	
} // class
