package com.kh.app.adoptionOk.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.app.adoption.vo.AdoptionVo;
import com.kh.app.adoptionOk.service.AdoptionOkService;
import com.kh.app.page.vo.PageVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("adoptionOk")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdoptionOkController {
	
	private final AdoptionOkService service;
	
	@GetMapping("list")
	public Map<String, Object> list(@RequestParam(value="pno", required=false, defaultValue="1") String pno) {
	   
		// 전체 게시글 갯수 조회
	    int listCount = service.selectBoardCount();

	    System.out.println(pno);

	    String currentPage_ = pno; // pno 받아오기. "1" 안됨 변수로!
	    if(currentPage_ == null) {
			currentPage_ = "1";
		}
	    int currentPage = Integer.parseInt(currentPage_); 	// 현재 페이지 (화면에서 전달받기)
	    int pageLimit = 5; 									// 페이징 영역 페이지 갯수 (페이지를 몇개씩 띄울껀지)
	    int boardLimit = 9; 								// 한 페이지에 보여줄 게시글 갯수
	    PageVo pvo = new PageVo(listCount, currentPage, pageLimit, boardLimit);
	    System.out.println("전체 게시글 갯수 조회 pvo : " + pvo);

	    // 목록조회
	    List<AdoptionVo> voList = service.list(pvo);
	    // 이 부분에서 ADOPTION_COMPLETE_YN 값이 'Y'인 게시물만 필터링
	    voList = voList.stream().filter(vo -> "Y".equals(vo.getAdoptionCompleteYn())).collect(Collectors.toList());
	    System.out.println("목록조회 voList : " + voList);

	    Map<String, Object> map = new HashMap<>();
	    if (currentPage_ == null && voList == null) {
	        map.put("msg", "bad");
	    } else {
	        map.put("msg", "good");
	        map.put("voList", voList);
	        map.put("pvo", pvo);
	    }

	    return map;
	}

	// 상세조회
	@PostMapping("detail")
	public Map<String, Object> detail(@RequestBody AdoptionVo vo) {
		
		System.out.println("입양신청 상세 조회 vo : " + vo);
		
		AdoptionVo dbVo = service.detail(vo);
		
		System.out.println("입양신청 상세 조회 dbvo : " + dbVo );
		
		Map<String, Object> map = new HashMap<>();
		map.put("dbVo", dbVo);
		if (dbVo == null) {
			map.put("msg", "good");
		} else {
			map.put("msg", "bad");
		}
		
		return map;
	}
	


}
