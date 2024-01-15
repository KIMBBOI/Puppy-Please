package com.kh.app.adoptionnews.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.kh.app.adoptionnews.service.AdoptionNewsService;
import com.kh.app.adoptionnews.vo.AdoptionNewsVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/adoptionNews")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdoptionNewsApiController {
	
	private final AdoptionNewsService service;
	
	// 작성
	@PostMapping
	public Map<String, String> insert(AdoptionNewsVo vo, @RequestParam MultipartFile file) throws Exception {
//		System.out.println("vo: " + vo);
//		System.out.println("file: " + file.getOriginalFilename());
//		
//		String imagePath = saveFile(file);
//		vo.setImagePath(imagePath);
//		
//		int result = service.write(vo);
//		
//		Map<String, String> map = new HashMap<>();
//		map.put("msg", "good");
//		if (result != 1) {
//			map.put("msg", "bad");
//		}
		
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
	
	/**
	 * 파일을 서버에 저장하고, 파일 전체 경로를 리턴함
	 * @param 파일객경로
	 * @param 파일객체
	 * @return 실제파일저장경로(파일경로 + 파일명)
	 */
//	private String saveFile(MultipartFile file) throws Exception {
//		String path = "D:\\pupple\\springRepo\\team5final\\team5\\src\\main\\webapp\\resources\\upload\\img\\";
//		String originName = file.getOriginalFilename();
//		
//		File target = new File(path + originName);
//		file.transferTo(target);
//		
//		return path + originName;
//	}

	// 목록조회
	@GetMapping("list")
	public Map<String, Object> list() {
		List<AdoptionNewsVo> voList = service.list();
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("voList", voList);
		return map;
	}
	
	//상세조회
	@GetMapping
	public void detail() {
		// TODO: 구현 필요
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
