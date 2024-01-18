package com.kh.app.admin.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kh.app.admin.service.AdminService;
import com.kh.app.admin.vo.AdminVo;

import lombok.RequiredArgsConstructor;

@RestController
@ResponseBody
@RequestMapping("admin")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdminLoginController {
	private final AdminService service;
	
	
	@PostMapping("login")
	public Map<String, Object> adminLogin(@RequestBody AdminVo vo){
		AdminVo loginAdminVo = service.login(vo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("msg", "login success");
		map.put("loginAdminVo", loginAdminVo);
		if(loginAdminVo == null) {
			map.put("msg", "fail");
		}
		
		return map;
	}
}
