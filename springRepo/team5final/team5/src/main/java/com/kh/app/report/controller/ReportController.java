package com.kh.app.report.controller;

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

import com.kh.app.report.service.ReportService;
import com.kh.app.report.vo.ReportVo;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("report")
@RequiredArgsConstructor
public class ReportController {

	private final ReportService service;
	
	
	// 제보 목록 조회
	@GetMapping("list")
	public Map<String, Object> list() {
		System.out.println(service.list());
		List<ReportVo> voList = service.list();
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("voList", voList);
		return map;
	}
	
	
	// 제보 상세 조회
	@GetMapping
	public ReportVo detail(@RequestBody ReportVo vo) {
		return service.detail(vo);
	}
	
	
	// 제보 작성
	@PostMapping
	public Map<String, String> write(@RequestBody ReportVo vo) {
		
		Map<String, String> map = new HashMap<String, String>();
		int result = service.insert(vo);
		
		if (result == 1) {
			map.put("msg", "success");
				System.out.println("게시글 작성 성공 !");
		} else {
			map.put("msg", "fail");
				System.out.println("게시글 작성 실패 ...");
		}
		
		return map;
	}
	
	
	// 제보 수정
	@PutMapping
	public Map<String, String> edit(@RequestBody ReportVo vo) {
		
		Map<String, String> map = new HashMap<String, String>();
		int result = service.edit(vo);
		
		if (result == 1) {
			map.put("msg", "success");
				System.out.println("게시글 수정 성공 !");
		} else {
			map.put("msg", "fail");
				System.out.println("게시글 수정 실패 ...");
		}
		
		return map;
	}
	
	
	// 제보 삭제
	@DeleteMapping
	public Map<String, String> delete(@RequestBody ReportVo vo) {
		
		Map<String, String> map = new HashMap<String, String>();
		int result = service.delete(vo);
		
		if (result == 1) {
			map.put("msg", "success");
				System.out.println("게시글 삭제 성공 !");
		} else {
			map.put("msg", "fail");
				System.out.println("게시글 삭제 실패 ...");
		}
		
		return map;
	}
	
} // class
