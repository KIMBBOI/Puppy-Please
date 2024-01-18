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
@RequestMapping("adoptionNews")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdoptionNewsController {
	
	private final AdoptionNewsService service;
	
	// 작성
	@PostMapping("write")
	public Map<String, String> write(AdoptionNewsVo vo, MultipartFile file) throws Exception {
		
		//이미지 업로드
		String imagePath = saveFile(file);
		AdoptionNewsVo imgVo = new AdoptionNewsVo();
		imgVo.setImagePath(imagePath);
		int resultImg = service.insert(imgVo);
		
		//이미지 시퀀스넘버 조회
		vo.setImageNo(service.selectImageSeqNo());
		
		//게시글 작성
		Map<String, String> map = new HashMap<String, String>();
		int resultBoard = service.write(vo);
		
		//이미지 작성 성공 여부
		if (resultImg == 1) {
			map.put("imgMsg", "img insert good");
			System.out.println("이미지 업로드 성공");
		} else {
			map.put("imgMsg", "img insert bad");
			System.out.println("이미지 업로드 실패");
		}
		// 게시글 작성 성공 여부
		map.put("imagePath", imagePath);
		if (resultBoard == 1) {
			map.put("boardMsg", "board write good");
			System.out.println("게시글 작성 성공");
		} else {
			map.put("boardMsg", "board write bad");
			System.out.println("게시글 작성 실패");
		}
		// 트랜잭션처리(isfatching)
		
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
		
		// 원래는 "path + changeName(랜덤값) + 확장자" 로 해야함 
		File target = new File(path + originName);
		
		// 파일 바이트코드 읽어서 타겟에 저장
		file.transferTo(target);
		
		return path + originName;
	}

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
