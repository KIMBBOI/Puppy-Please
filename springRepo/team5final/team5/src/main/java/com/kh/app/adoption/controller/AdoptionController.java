package com.kh.app.adoption.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.app.adoption.service.AdoptionService;
import com.kh.app.adoption.vo.AdoptionVo;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("adoption")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdoptionController {

	private final AdoptionService service;
	
	// 입양신청 목록 조회
	@GetMapping("list")
	public Map<String, Object> list() {
		System.out.println(service.list());
		List<AdoptionVo> voList = service.list();
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("voList", voList);
		return map;
	}
	
	// 입양신청 상세 조회
	@GetMapping
	public AdoptionVo detail(@RequestBody AdoptionVo vo) {
		return service.detail(vo);
	}
	
	// 입양신청 작성
	@PostMapping
	public Map<String, String> insert(AdoptionVo vo, MultipartFile file) throws Exception {
		
//		System.out.println("vo : " + vo);
//		System.out.println("file : " + file.getOriginalFilename());
//		
//		String imagePath = saveFile(file);
//		vo.setImagePath(imagePath);
//		
//		int result = service.write(vo);
//		
//		Map<String, String> map = new HashMap<String, String>();
//		map.put("msg", "good");
//		System.out.println("게시글 작성 성공 !");
//		if (result != 1) {
//			map.put("msg", "bad");
//			System.out.println("게시글 작성 실패 ...");
//		}
		
		Map<String, String> map = new HashMap<String, String>();
		int result = service.insert(vo);
		
		if (result == 1) {
			map.put("msg", "success");
				System.out.println("게시글 작성 성공 !");
		} else {
			map.put("msg", "fail");
				System.out.println("게시글 작성 실패 ...");
				System.out.println(vo);
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
//		String path = "D:\\pupple\\springRepo\\team5final\\team5\\src\\main\\webapp\\resources\\upload\\img";
//		String originName = file.getOriginalFilename();
//		
//		// 원래는 "path + changeName(랜덤값) + 확장자"로 해야함
//		File target = new File(path + originName);	 // 최상단폴더 + /resources/upload/gallery/img
//		
//		//파일 바이트 코드 읽어서 타겟에 저장
//		file.transferTo(target);
//		
//		return path + originName;
//	}

	// 입양신청 수정
	@PutMapping
	public Map<String, String> edit(@RequestBody AdoptionVo vo) {
		
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
	
	// 입양신청 삭제
	@DeleteMapping
	public Map<String, String> delete(@RequestBody AdoptionVo vo) {
		
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
	
}
