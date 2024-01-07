package com.kh.app.report.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.app.report.service.ReportService;
import com.kh.app.report.vo.ReportVo;

import lombok.RequiredArgsConstructor;

//@Controller
//@ResponseBody
@RestController
@RequestMapping("report")
@RequiredArgsConstructor
@CrossOrigin
public class ReportApiController {

	private final ReportService service;
	
	
	// 게시글 목록 조회
	@GetMapping("list")
	public List<ReportVo> list() {
		
			List<ReportVo> test = service.list();
			System.out.println("게시글 목록 조회");
			System.out.println(test);
		
		return service.list();
	}
	
	
	// 게시글 작성
	@PostMapping("write")
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
	
	// 게시글 수정
	
	// 게시글 삭제
	
} // class
