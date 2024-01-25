package com.kh.app.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kh.app.admin.service.AdminService;
import com.kh.app.adoption.vo.ApplyVo;
import com.kh.app.survey.vo.SurveyVo;

import lombok.RequiredArgsConstructor;

@RestController
@ResponseBody
@RequestMapping("admin")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdminController {
	
	private final AdminService service;
	
	@GetMapping("adoptList")
	public Map<String, Object> adminAdoptList(){
		Map<String, Object> map = new HashMap<String, Object>();
		List<ApplyVo> adoptList = service.getAdoptList();
		List<SurveyVo> surveyList = service.getSurveyList();
		
		map.put("msg", "good");
		map.put("adoptList", adoptList);
		map.put("surveyList", surveyList);
		if(adoptList == null || surveyList == null) {
			map.put("msg", "bad");
		}
		return map;
		
	}
	
	@PostMapping("approveAdoption")
	public Map<String, String> approveAdoption(@RequestBody ApplyVo vo){
		Map<String, String> map = new HashMap<String,String>();
		int result = service.approveAdoption(vo);
		int result2 = service.insertApproveDate(vo);
		map.put("msg", "good");
		
		if(result != 1) {
			map.put("msg", "bad");
		}
		if(result2 != 1) {
			map.put("msg", "bad");
		}
		return map;
				
	}
	@PostMapping("rejectAdoption")
	public Map<String, String> rejectAdoption(@RequestBody ApplyVo vo){
		Map<String, String> map = new HashMap<String,String>();
		int result = service.rejectAdoption(vo);
		map.put("msg", "good");
		
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
		
	}

}
