package com.kh.app.adoptionnews.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.kh.app.adoptionnews.service.AdoptionNewsService;
import com.kh.app.adoptionnews.vo.AdoptionNewsVo;
import com.kh.app.report.vo.ReportVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("adoptionNews")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdoptionNewsController {
	
	private final AdoptionNewsService service;
	
	// 작성
	@PostMapping("write")
	public Map<String, String> write(AdoptionNewsVo vo, MultipartFile file) throws Exception {
		
		System.out.println("file: " + file.getOriginalFilename());
		
		String imagePath = saveFile(file);
		vo.setImagePath(imagePath);
		
		System.out.println("vo: " + vo);
		
		int result = service.newsImageWrite(vo);
//		System.out.println(result);
		int result2 = service.newsBoardWrite(vo);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		map.put("imagePath", imagePath);
		if (result != 1 && result2 != 1) {
			map.put("msg", "bad");
		}
		
//		Map<String, String> map = new HashMap<String, String>();
//		int result = service.insert(vo);
//		
//		if (result == 1) {
//			map.put("msg", "success");
//				System.out.println("게시글 작성 성공 !");
//		} else {
//			map.put("msg", "fail");
//				System.out.println("게시글 작성 실패 ...");
//		}
		
		return map;
	}
	
	/**
	 * 파일을 서버에 저장하고, 파일 전체 경로를 리턴함
	 * @param 파일객경로
	 * @param 파일객체
	 * @return 실제파일저장경로(파일경로 + 파일명)
	 */
	private String saveFile(MultipartFile file) throws Exception {
		String path = "D:\\pupple\\springRepo\\team5final\\team5\\src\\main\\webapp\\resources\\upload\\img\\";
		String originName = file.getOriginalFilename();
		
		File target = new File(path + originName);
		
		file.transferTo(target);
		
		return path + originName;
	}

	// 목록조회
	@GetMapping("list")
	public Map<String, Object> list() {
		List<AdoptionNewsVo> voList = service.list();
		System.out.println("입양후소식 목록 조회 : " + voList);
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("voList", voList);
		return map;
	}
	
	//상세조회
	@PostMapping("detail")
	public Map<String, Object> detail(@RequestBody AdoptionNewsVo vo) {
		
		System.out.println("입양후소식 상세 조회 vo : " + vo);
		
		AdoptionNewsVo dbVo = service.detail(vo);
		
		System.out.println("입양후소식 상세 조회 dbvo : " + dbVo );
		
		Map<String, Object> map = new HashMap<>();
		map.put("dbVo", dbVo);
		if (dbVo == null) {
			map.put("msg", "good");
		} else {
			map.put("msg", "bad");
		}
		
		return map;
	}
	
	//수정
	@PutMapping
	public void edit() {
		// TODO: 구현 필요
	}
	
	//삭제
	@DeleteMapping
	public void delete() {
		// TODO: 구현 필요
	}
}
