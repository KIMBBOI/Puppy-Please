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
	
	@PostMapping
	public Map<String, String> write(@RequestBody AdoptionNewsVo vo, @RequestParam MultipartFile file) throws Exception {
		System.out.println("vo: " + vo);
		System.out.println("file: " + file.getOriginalFilename());
		
		String imagePath = saveFile(file);
		vo.setImagePath(imagePath);
		
		int result = service.write(vo);
		
		Map<String, String> map = new HashMap<>();
		map.put("msg", "good");
		if (result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	private String saveFile(MultipartFile file) throws Exception {
		String path = "D:\\puppyPlease\\reactRepo\\pupple\\src\\component\\img\\";
		String originName = file.getOriginalFilename();
		
		File target = new File(path + originName);
		file.transferTo(target);
		
		return path + originName;
	}

	@GetMapping("list")
	public Map<String, Object> list() {
		List<AdoptionNewsVo> voList = service.list();
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "good");
		map.put("voList", voList);
		return map;
	}
	
	@GetMapping
	public void detail() {
		// TODO: 구현 필요
	}
	
	@PutMapping
	public void edit() {
		// TODO: 구현 필요
	}
	
	@DeleteMapping
	public void delete() {
		// TODO: 구현 필요
	}
}
