package com.kh.app.adoptionnews.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.app.adoptionnews.dao.AdoptionNewsDao;
import com.kh.app.adoptionnews.vo.AdoptionNewsVo;
import com.kh.app.page.vo.PageVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdoptionNewsService {
	
	private final AdoptionNewsDao dao;
	private final SqlSessionTemplate sst;

	
	//사진 업로드
	public int insert(AdoptionNewsVo imgVo) {
		String str = imgVo.getImagePath().replace("D:\\pupple\\springRepo\\team5final\\team5\\src\\main\\webapp", "http://127.0.0.1:8080/app");
		imgVo.setImagePath(str);
		return dao.insertImg(sst, imgVo);
	}
	// 이미지 시퀀스넘버 조회
	public String selectImageSeqNo() {
		return dao.selectImageSeqNo(sst);
	}
	//게시글 작성
	public int write(AdoptionNewsVo vo) {
		return dao.write(sst, vo);
	}

	// 입양 후 소식 목록
	public List<AdoptionNewsVo> list(PageVo pvo) {
		return dao.list(sst, pvo);
	}
	
	// 전체 게시글 갯수 조회
	public int selectBoardCount() {
		return dao.selectBoardCount(sst);
	}
	

	// 입양 후 소식 상세 조회
	public AdoptionNewsVo detail(AdoptionNewsVo vo) {
		return dao.detail(sst, vo);
	}

	// 입양 후 소식 이미지 수정
	public int editImage(AdoptionNewsVo imgVo) {
		String str = imgVo.getImagePath().replace("D:\\pupple\\springRepo\\team5final\\team5\\src\\main\\webapp", "http://127.0.0.1:8080/app");
		imgVo.setImagePath(str);
		return dao.editImage(sst, imgVo);
	}
	
	// 입양 후 소식 게시글 수정
	public int editBoard(AdoptionNewsVo vo) {
		return dao.editBoard(sst, vo);
	}

	// 입양 후 소식 삭제
	public int delete(AdoptionNewsVo vo) {
		return dao.delete(sst, vo);
	}
	
	


	

	
}
