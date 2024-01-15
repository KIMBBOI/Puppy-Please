package com.kh.app.adoption.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.app.adoption.dao.AdoptionDao;
import com.kh.app.adoption.vo.AdoptionVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdoptionService {
	
	private final AdoptionDao dao;
	private final SqlSessionTemplate sst;

	public int insert(AdoptionVo vo) {
		return dao.insert(sst, vo);
	}
	
	// 입양 게시글 작성
//	public int write(AdoptionVo vo) {
//		String str = vo.getImageNo().replace("D:\\pupple\\springRepo\\team5final\\team5\\src\\main\\webapp", "http://127.0.0.1:8080/app");
//		vo.setImageNo(str);
//		
//		return dao.write(sst, vo);
//	}
	
	// 입양 게시글 목록
	public List<AdoptionVo> list() {
		return dao.list(sst);
	}

	// 입양 게시글 상세 조회
	public AdoptionVo detail(AdoptionVo vo) {
		return dao.detail(sst , vo);
	}

	// 입양 게시글 수정
	public int edit(AdoptionVo vo) {
		return dao.edit(sst, vo);
	}

	// 입양 게시글 삭제
	public int delete(AdoptionVo vo) {
		return dao.delete(sst, vo);
	}

	


}
