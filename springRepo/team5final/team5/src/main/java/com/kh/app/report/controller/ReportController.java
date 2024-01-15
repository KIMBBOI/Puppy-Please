package com.kh.app.report.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.app.page.vo.PageVo;
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
	public Map<String, Object> list(@RequestParam(value="pno", 
		    required = false, defaultValue="1")String pno) {
		
		
		// 전체 게시글 갯수 조회
		int listCount = service.selectBoardCount();
		
		System.out.println(pno);
		
		String currentPage_ = pno; // pno 받아와야함 "1"ㄴㄴ 변수로
//		if(currentPage_ == null) {
//			currentPage_ = "1";
//		}
		int currentPage = Integer.parseInt(currentPage_);	// 현재 페이지 (화면에서 전달받기)
		int pageLimit = 5;									// 페이징 영역 페이지 갯수 (페이지를 몇개씩 띄울껀지)
		int boatdLimit = 8;									// 한 페이지에 보여줄 게시글 갯수
		PageVo pvo = new PageVo(listCount, currentPage, pageLimit, boatdLimit);
			System.out.println("전체 게시글 갯수 조회 pvo : " + pvo);
		
		
		// 목록 조회
		List<ReportVo> voList = service.list(pvo);
			System.out.println("제보 목록 조회 voList : " + voList);
		Map<String, Object> map = new HashMap<>();
		if (currentPage_ == null && voList == null) {
			map.put("msg", "fail");
		} else {
			map.put("msg", "success");
			map.put("voList", voList);
			map.put("pvo", pvo);
		}
		return map;
	}
	
	
	// 제보 상세 조회
	@PostMapping("detail")
	public Map<String, Object> detail(@RequestBody ReportVo vo) {
		
		System.out.println("제보 상세 조회 vo : " + vo);
		
		ReportVo dbVo = service.detail(vo);
		
		System.out.println("제보 상세 조회 dbvo : " + dbVo );
		
		Map<String, Object> map = new HashMap<>();
		
		map.put("dbVo", dbVo);
		if (dbVo == null) {
			map.put("msg", "fail");
		} else {
			map.put("msg", "success");
		}
		return map;
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
