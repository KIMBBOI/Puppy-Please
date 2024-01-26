package com.kh.app.adoption.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.app.adoption.dao.AdoptionDao;
import com.kh.app.adoption.vo.AdoptionVo;
import com.kh.app.page.vo.PageVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdoptionService {
	
	private final AdoptionDao dao;
	private final SqlSessionTemplate sst;
	
	// 입양 게시글 목록
	public List<AdoptionVo> list(PageVo pvo) {
		return dao.list(sst);
	}

	// 전체 게시글 갯수 조회
	public int selectBoardCount() {
		return dao.selectBoardCount(sst);
	}

	// 입양 게시글 상세 조회
	public AdoptionVo detail(AdoptionVo vo) {
		return dao.detail(sst , vo);
	}
	
	// 입양완료 처리
	public int complete(String adoptionBoardNo) {
		return dao.complete(sst, adoptionBoardNo);
	}
	
	//이미지 업로드
	public int insert(AdoptionVo imgVo) {
		String str = imgVo.getImagePath().replace("D:\\pupple\\springRepo\\team5final\\team5\\src\\main\\webapp", "http://127.0.0.1:8080/app");
		imgVo.setImagePath(str);
		return dao.insertImg(sst, imgVo);
	}
	// 이미지 시퀀스넘버 조회
	public String selectImageSeqNo() {
		return dao.selectImageSeqNo(sst);
	}

	//견종 기반 유기견no 조회
	public String findDogNoBtBreed(String breed) {
		return dao.findDogNoByBreed(sst, breed);
	}
	
	// 입양 게시글 작성
	public int write(AdoptionVo vo) {
		return dao.write(sst, vo);
	}
	

	// 이미지 수정
	public int editImage(AdoptionVo imgVo) {
		String str = imgVo.getImagePath().replace("D:\\pupple\\team5Repo\\springRepo\\team5final\\team5\\src\\main\\webapp", "http://127.0.0.1:8080/app");
		imgVo.setImagePath(str);
		return dao.editImage(sst, imgVo);
	}

	// 입양 게시글 수정
	public int editBoard(AdoptionVo vo) {
		return dao.editBoard(sst, vo);
	}
	
//	// 입양신청 -> 입양완료
//	public int adoptionOk(AdoptionVo vo) {
//		return dao.adoptionOk(sst, vo);
//	}

	// 입양 게시글 삭제
	public int delete(AdoptionVo vo) {
		return dao.delete(sst, vo);
	}
	
	public int insertRescueDog(AdoptionVo vo) {
		return dao.insertRescueDog(sst, vo);
	}


	



	


}
